import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject
} from '@angular/core'
import { ApolloError, ApolloQueryResult } from '@apollo/client/core'
import { FetchResult } from '@apollo/client/link/core/types'
import { TranslocoService } from '@ngneat/transloco'
import { Observable, Subject, of } from 'rxjs'
import { catchError, first, map, takeUntil } from 'rxjs/operators'

import { Scalars, Site } from '@core/generated/types'

import { HttpErrorResponse } from '@angular/common/http'
import { DatalistItem } from '@components/datalist/datalist-item.model'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { CurrentUserService } from '@core/current-user/current-user.service'
import {
  AllocateUserToPortalGQL,
  AllocateUserToPortalMutation
} from '../../graphql/mutation/allocate-user-to-portal.graphql-gen'
import {
  AllocateUserToSiteGQL,
  AllocateUserToSiteMutation
} from '../../graphql/mutation/allocate-user-to-site.graphql-gen'
import {
  DeallocateUserFromPortalGQL,
  DeallocateUserFromPortalMutation
} from '../../graphql/mutation/deallocate-user-from-portal.graphql-gen'
import {
  DeallocateUserFromSiteGQL,
  DeallocateUserFromSiteMutation
} from '../../graphql/mutation/deallocate-user-from-site.graphql-gen'
import {
  MeUserAccessItemGQL,
  MeUserAccessItemQuery
} from '../../graphql/query/me-user-access-item.graphql-gen'
import {
  UserAccessItemGQL,
  UserAccessItemPortalFragment,
  UserAccessItemQuery
} from '../../graphql/query/user-access-item.graphql-gen'
import {
  UserProfileFragment,
  UserProfileGQL,
  UserProfileQuery
} from '../../graphql/query/user-profile.graphql-gen'
import { UserAccessItem } from './user-access-item.model'

enum DeallocateUserFromSiteErrors {
  contractManagerDeallocation = 'CONTRACT_MANAGER_DEALLOCATION_DISALLOWED'
}

@Component({
  selector: 'app-user-access-item',
  templateUrl: './user-access-item.component.html'
})
export class UserAccessItemComponent implements OnInit, OnDestroy {
  @Input() public userAccessItem?: UserAccessItem
  @Input() public index = 0
  @Input() public userId$: Observable<string>
  @Input() public portals: DatalistItem[]
  @Input() public hasAccessToSelectedPortal: boolean = false
  @Output() public selectPortalName = new EventEmitter<DatalistItem>()
  @Output() public removeUserAccessItem = new EventEmitter<number>()
  @Output() public allocatedToPortal = new EventEmitter<Scalars['UUID']>()
  @Output() public deallocatedFromPortal = new EventEmitter<Scalars['UUID']>()

  public user: UserProfileFragment
  public sites: Site[] = []
  public selectedPortalId: Scalars['UUID'] = ''

  private unsubscribe$: Subject<void> = new Subject<void>()

  private meUserAccessItemGQL = inject(MeUserAccessItemGQL)
  private userAccessItemGQL = inject(UserAccessItemGQL)
  private allocateUserToSiteGQL = inject(AllocateUserToSiteGQL)
  private deAllocateUserFromSiteGQL = inject(DeallocateUserFromSiteGQL)
  private allocateUserToPortalGQL = inject(AllocateUserToPortalGQL)
  private deAllocateUserFromPortalGQL = inject(DeallocateUserFromPortalGQL)
  private toastService = inject(ToasterService)
  private currentUserService = inject(CurrentUserService)
  private translocoService = inject(TranslocoService)
  private userProfileGQL = inject(UserProfileGQL)

  /**
   * On init subscribe to query
   */
  public ngOnInit(): void {
    this.userId$.pipe(first()).subscribe({
      next: (userId) =>
        this.getUserProfileData(userId).subscribe(
          (user: UserProfileFragment) => {
            this.user = user
            this.selectedPortalId = this.userAccessItem?.selectedPortalId
            if (this.selectedPortalId) {
              this.setUserAccessQuerySubscription()
            }
          }
        )
    })
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  public onDatalistChange(item: DatalistItem | undefined | null) {
    if (!item) {
      return
    }
    this.selectPortalName.emit(item)
    this.selectedPortalId = item.value
    this.setUserAccessQuerySubscription()
  }

  public onCheckboxChange(target: any, site: Site) {
    if (target.checked) {
      this.allocateUserToSite(site)
    } else {
      this.deallocateUserFromSite(site)
    }
  }

  public initializeCheckboxValue(site: Site): boolean {
    return (
      this.user.relatedPortalData?.sites?.some(
        (userSite: any) => userSite.id === site.id
      ) || false
    )
  }

  public removeUserAccess() {
    if (this.selectedPortalId) {
      this.deallocateUserFromPortal()
    } else {
      this.removeUserAccessItem.emit(this.index)
    }
  }

  /**
   * Set subscription for user access data
   */
  private setUserAccessQuerySubscription(): void {
    this.getUserAccessData(this.selectedPortalId)
      .pipe(first())
      .subscribe({
        next: (portal: UserAccessItemPortalFragment) => {
          this.setUserAccessToPortal(portal)

          // sort sites alphabetically by language
          const collator = new Intl.Collator()
          this.sites = [...(<Site[]>portal.sites)].sort((a, b) => {
            return collator.compare(a.name, b.name)
          })
        }
      })
  }

  private setUserAccessToPortal(portal: UserAccessItemPortalFragment) {
    // check if user has access to selected portal
    this.hasAccessToSelectedPortal =
      this.user.relatedPortalData?.portals?.some(
        (userPortal: any) => userPortal.id === portal.id
      ) || false
    if (!this.hasAccessToSelectedPortal) {
      this.allocateUserToPortal(this.selectedPortalId)
    }
  }

  /**
   * Run query for user access data
   * @param {Scalars['UUID']} userId
   * @param {Scalars['UUID']} portalId
   * @returns {Observable<Query>}
   */
  private getUserAccessData(
    portalId: Scalars['UUID']
  ): Observable<UserAccessItemPortalFragment> {
    if (this.currentUserService.isSuperUser) {
      return this.userAccessItemGQL
        .fetch(
          {
            portalId: portalId
          },
          { fetchPolicy: 'no-cache' }
        )
        .pipe(
          map(
            (result: ApolloQueryResult<UserAccessItemQuery>) =>
              result.data.portals[0]
          )
        )
    }

    return this.meUserAccessItemGQL
      .fetch(
        {
          portalId: portalId
        },
        { fetchPolicy: 'no-cache' }
      )
      .pipe(
        map(
          (result: ApolloQueryResult<MeUserAccessItemQuery>) =>
            result.data?.me?.relatedPortalData
              ?.portals[0] as UserAccessItemPortalFragment
        )
      )
  }

  /**
   * Run mutation to allocate user to portal
   * @param {Scalars['UUID']} userId
   * @param {Scalars['UUID']} portalId
   * @returns {Observable<Mutation>}
   */
  private allocateUserToPortal(portalId: Scalars['UUID']) {
    this.allocateUserToPortalGQL
      .mutate({
        portalId,
        userId: this.user.id
      })
      .subscribe({
        next: (
          res: FetchResult<
            AllocateUserToPortalMutation,
            Record<string, any>,
            Record<string, any>
          >
        ) => {
          if (res.data?.allocateUserToPortal) {
            const portalName = this.userAccessItem
              ? this.userAccessItem.selectedPortalName
              : ''
            const message = this.translocoService.translate(
              'UserAccess.AccessAdded',
              { name: portalName }
            )
            const success = new Toast('success', message)
            this.toastService.addToast(success)
            this.allocatedToPortal.emit(portalId)
            this.hasAccessToSelectedPortal = !this.hasAccessToSelectedPortal
          }
        },
        error: () => this.showErrorToast()
      })
  }

  /**
   * Run mutation to de-allocate user to portal
   * @param {Scalars['UUID']} userId
   * @param {Scalars['UUID']} portalId
   * @returns {Observable<Mutation>}
   */
  private deallocateUserFromPortal() {
    this.deAllocateUserFromPortalGQL
      .mutate({
        portalId: this.selectedPortalId,
        userId: this.user.id
      })
      .subscribe({
        next: (
          res: FetchResult<
            DeallocateUserFromPortalMutation,
            Record<string, any>,
            Record<string, any>
          >
        ) => {
          const portalName = this.userAccessItem
            ? this.userAccessItem.selectedPortalName
            : ''
          if (res.data?.deallocateUserFromPortal) {
            const message = this.translocoService.translate(
              'UserAccess.AccessRevoked',
              {
                name: portalName
              }
            )
            const success = new Toast('success', message)
            this.toastService.addToast(success)
            this.deallocatedFromPortal.emit(this.selectedPortalId)
            this.hasAccessToSelectedPortal = !this.hasAccessToSelectedPortal
            this.selectedPortalId = ''
            this.sites = []
            this.removeUserAccessItem.emit(this.index)
          }
        },
        error: () => this.showErrorToast()
      })
  }

  /**
   * Run mutation to allocate user to site
   * @param {Scalars['UUID']} userId
   * @param {Scalars['UUID']} siteId
   * @returns {Observable<Mutation>}
   */
  private allocateUserToSite(site: Site) {
    this.allocateUserToSiteGQL
      .mutate({
        siteId: site.id,
        userId: this.user.id
      })
      .subscribe({
        next: (
          res: FetchResult<
            AllocateUserToSiteMutation,
            Record<string, any>,
            Record<string, any>
          >
        ) => {
          if (res.data?.allocateUserToSite) {
            const message = this.translocoService.translate(
              'UserAccess.AccessAdded',
              { name: site.name }
            )
            const success = new Toast('success', message)
            this.toastService.addToast(success)
          }
        },
        error: () => this.showErrorToast()
      })
  }

  /**
   * Run mutation to de-allocate user to site
   * @param {Scalars['UUID']} userId
   * @param {Scalars['UUID']} siteId
   * @returns {Observable<Mutation>}
   */
  private deallocateUserFromSite(site: Site) {
    this.deAllocateUserFromSiteGQL
      .mutate({
        siteId: site.id,
        userId: this.user.id
      })
      .pipe(
        catchError((err: ApolloError) => {
          let httpError = err.networkError as HttpErrorResponse
          const networkErrorCode = httpError.error.errors[0].extensions.code

          // checking if the newtwork error is due to dellocation a contract manager from a site
          if (
            networkErrorCode ===
            DeallocateUserFromSiteErrors.contractManagerDeallocation
          ) {
            const message = this.translocoService.translate(
              'UserAccess.DeallocateContractManagerError'
            )
            this.toastService.addToast(new Toast('error', message))
          }
          return of()
        })
      )
      .subscribe({
        next: (
          res: FetchResult<
            DeallocateUserFromSiteMutation,
            Record<string, any>,
            Record<string, any>
          >
        ) => {
          if (res.data?.deallocateUserFromSite) {
            const message = this.translocoService.translate(
              'UserAccess.SiteAccessRevoked',
              {
                name: site.name
              }
            )
            const success = new Toast('success', message)
            this.toastService.addToast(success)
          }
        },
        error: () => this.showErrorToast()
      })
  }

  /**
   * Run query for user profile data
   * @param {Scalars['UUID']} userId
   * @returns {Observable<UserProfileQuery>}
   */
  private getUserProfileData(
    userId: Scalars['UUID']
  ): Observable<UserProfileFragment> {
    return this.userProfileGQL
      .watch(
        {
          userId
        },
        { fetchPolicy: 'no-cache' }
      )
      .valueChanges.pipe(
        takeUntil(this.unsubscribe$),
        map(
          (result: ApolloQueryResult<UserProfileQuery>) =>
            result.data.user as UserProfileFragment
        )
      )
  }

  /**
   * Show error toast
   */
  private showErrorToast(): void {
    const message = this.translocoService.translate('General.ApiError')
    const error = new Toast('error', message)
    this.toastService.addToast(error)
  }
}
