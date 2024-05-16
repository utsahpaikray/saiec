import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { Observable, Subject } from 'rxjs'
import {
  first,
  map,
  skipWhile,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators'
import { CurrentUserService } from '@core/current-user/current-user.service'
import {
  IdentityUser,
  Portal,
  Portal_UsersConnection,
  Portal_UsersEdge
} from '@core/generated/types'
import { PortalService } from '@core/portals/portal.service'
import { UserService } from '@core/users/user.service'
import { TranslocoService } from '@ngneat/transloco'
import {
  PortalUserFragment,
  PortalUsersGQL,
  PortalUsersQuery
} from './graphql/portal-users.graphql-gen'

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit, OnDestroy {
  public portal?: Portal
  public users: IdentityUser[]
  public searchText: string = ''

  public hasNextPage: boolean
  public totalCount: number
  public loadMoreCursor: string

  private portalId: string
  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private currentUserService: CurrentUserService,
    private portalService: PortalService,
    private portalUsersGQL: PortalUsersGQL,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private translocoService: TranslocoService
  ) {
    this.setRouteParamSubscription()
  }

  /**
   * On init set super user observable
   */
  public ngOnInit(): void {
    this.fetchUsers()
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * Navigate to user profile page
   * @param {string} userId
   */
  public goToUserProfilePage(userId: string): void {
    this.currentUserService.userData$.pipe(first()).subscribe({
      next: (userData) => {
        if (userData.id === userId) {
          this.navigateTo(
            `/myprofile`,
            `..${this.router.routerState.snapshot.url}`
          )
          return
        }
        this.navigateTo(`./${userId}`, `../`, this.route)
      }
    })
  }

  /**
   * Navigate to based on router state and activated route
   */
  private navigateTo(
    to: string,
    backLinkUrl: string,
    relativeToRoute?: ActivatedRoute
  ): void {
    this.router.navigate([to], {
      state: {
        backLink: {
          title: this.translocoService.translate('General.Users'),
          url: backLinkUrl
        }
      },
      relativeTo: relativeToRoute
    })
  }

  /**
   *
   * @param {string} searchText
   */
  public search(searchText: string): void {
    if (searchText.length !== 1) {
      this.searchText = searchText
      this.fetchUsers()
    }
  }

  /**
   * Load additional data
   */
  public loadMore(): void {
    this.fetchPortalUsers(this.portalId, this.loadMoreCursor).subscribe({
      next: this.setPortalUsersData.bind(this)
    })
  }

  /**
   * Set user observable based on if user is in portal context
   */
  private fetchUsers(): void {
    if (this.portalId) {
      this.fetchPortalUsers(this.portalId).subscribe({
        next: this.setPortalUsersData.bind(this),
        error: () => (this.users = [])
      })
      return
    }

    this.fetchAdminUsers().subscribe({
      next: (users: IdentityUser[]) => {
        this.users = this.formatUsers(users)
      },
      error: () => (this.users = [])
    })
  }

  /**
   * Get all users
   */
  private fetchAdminUsers(): Observable<IdentityUser[]> {
    return this.userService.getUsers(this.searchText).pipe(first())
  }

  /**
   * Get all users for a certain portal
   * @param {string} portalId
   */
  private fetchPortalUsers(
    portalId: string,
    cursor?: string
  ): Observable<PortalUserFragment> {
    return this.portalUsersGQL
      .fetch({ portalId, cursor }, { fetchPolicy: 'no-cache' })
      .pipe(
        map(
          (result: ApolloQueryResult<PortalUsersQuery>) =>
            result.data.portal_users as PortalUserFragment
        ),
        first()
      )
  }

  /**
   * Set portal user data
   * @param {PortalUserFragment} portalUsers
   */
  private setPortalUsersData(portalUsers: PortalUserFragment): void {
    const edges = (portalUsers.edges as Portal_UsersEdge[]) || []
    this.setLoadMoreData(portalUsers as Portal_UsersConnection, edges)
    const identityUsers = edges
      .map((edge) => edge.node.relatedIdentityData)
      .filter((edge) => edge != null) as IdentityUser[]

    const users = this.users || []
    this.users = [...users, ...this.formatUsers(identityUsers)]
  }

  /**
   * Format highlighting user data
   * @param {IdentityUser[]} users
   */
  private formatUsers(users: IdentityUser[]): IdentityUser[] {
    if (!this.searchText || this.searchText.length === 0) {
      return users
    }
    return users.map((user) => {
      return {
        ...user,
        firstName: this.highlightSearchText(user.firstName as string),
        lastName: this.highlightSearchText(user.lastName as string),
        email: this.highlightSearchText(user.email as string),
        customerEmail: this.highlightSearchText(user.customerEmail as string)
      }
    })
  }

  /**
   * Set data necessary for load more data
   */
  private setLoadMoreData(
    users: Portal_UsersConnection,
    edges: Portal_UsersEdge[]
  ): void {
    this.hasNextPage = users.pageInfo.hasNextPage
    this.totalCount = users.totalCount
    this.loadMoreCursor = edges[edges.length - 1]?.cursor
  }

  /**
   * Highlight search text where applicable
   * @param {string} value
   * @returns {string}
   */
  private highlightSearchText(value: string): string {
    if (!value) {
      return value
    }
    const indexOfSearchText = value
      .toLowerCase()
      .indexOf(this.searchText.toLowerCase())
    if (indexOfSearchText === -1) {
      return value
    }

    return this.applyHighlight(
      value,
      indexOfSearchText,
      this.searchText.length + 1
    )
  }

  /**
   * Apply highlighting to string
   * @param {string} value
   * @param {number} startIndex
   * @param {number} endIndex
   * @returns
   */
  private applyHighlight(
    value: string,
    startIndex: number,
    endIndex: number
  ): string {
    const searchParts = value.split('')

    // Insert the string at the index position
    searchParts.splice(startIndex, 0, '<mark class="bg-orange-500 text-white">')
    searchParts.splice(startIndex + endIndex, 0, '</mark>')
    return searchParts.join('')
  }

  /**
   * Set subscription for User profile data
   */
  private setRouteParamSubscription(): void {
    this.route.params
      .pipe(
        takeUntil(this.unsubscribe$),
        skipWhile((params: Params) => !params.portalId),
        tap((params: Params) => (this.portalId = params.portalId)),
        switchMap((params: Params) =>
          this.portalService.getPortalById(params.portalId)
        )
      )
      .subscribe({
        next: (portal: Portal) => {
          this.portal = portal
        }
      })
  }
}
