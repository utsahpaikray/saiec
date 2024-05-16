import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { first, map, takeUntil } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs'

import { Scalars, Portal } from '@core/generated/types'
import { Roles } from '@core/interfaces/roles.enum'
import { PortalService } from '@core/portals/portal.service'
import { DatalistItem } from '@components/datalist/datalist-item.model'
import { UserAccessItem } from '../user-access-item/user-access-item.model'
import {
  UserProfileFragment,
  UserProfileGQL,
  UserProfileQuery
} from '../../graphql/query/user-profile.graphql-gen'
import { ApolloQueryResult } from '@apollo/client/core'

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html'
})
export class UserAccessComponent implements OnInit, OnDestroy {
  @Input() public userId$: Observable<string>

  public user: UserProfileFragment
  public portals: Portal[]
  public availablePortals: DatalistItem[] = []
  public userAccessItems: UserAccessItem[] = []
  public canAddPortalAccess = false

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private portalService: PortalService,
    private userProfileGQL: UserProfileGQL
  ) {}

  /**
   * On init subscribe to query
   */
  public ngOnInit(): void {
    this.userId$.pipe(first()).subscribe({
      next: (userId) =>
        this.getUserProfileData(userId).subscribe(
          (user: UserProfileFragment) => {
            this.user = user
            this.setPortalsQuerySubscription()
            this.setCanAddPortal()
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

  public initializeUserAccessItems(portals: Portal[]) {
    this.availablePortals = []

    const userPortalIds =
      this.user?.relatedPortalData?.portals.map(
        (userPortal) => userPortal?.id
      ) || []

    portals.forEach((portal) => {
      const hasUserAccess = userPortalIds.indexOf(portal.id) > -1
      if (hasUserAccess) {
        this.userAccessItems.push({
          selectedPortalName: portal.name,
          selectedPortalId: portal.id
        })
      } else {
        this.availablePortals.push(new DatalistItem(portal.id, portal.name))
      }
    })
  }

  public addPortal() {
    this.userAccessItems.push({ selectedPortalName: '' })
  }

  public removeAccess(index: number) {
    this.userAccessItems = this.userAccessItems.filter((_, i) => i !== index)
  }

  public updateUserAccessItem(portal: DatalistItem, index: number) {
    this.userAccessItems = this.userAccessItems.map((item, i) => {
      if (i === index) {
        ;(item.selectedPortalName = portal.label),
          (item.selectedPortalId = portal.value)
      }
      return item
    })
  }

  public removeFromAvailablePortals(selectedPortalId: Scalars['UUID']) {
    this.availablePortals = this.availablePortals.filter(
      (portal) => portal.value !== selectedPortalId
    )
  }

  public addToAvailablePortals(selectedPortalId: Scalars['UUID']) {
    const portalToAdd = this.portals.filter(
      (portal) => portal.id === selectedPortalId
    )
    this.availablePortals.push(
      new DatalistItem(portalToAdd[0].id, portalToAdd[0].name)
    )
  }

  /**
   * Set if more portals can be added for this user
   */
  public setCanAddPortal(): void {
    const userRoles = this.user?.roles?.map((role) => role.name) || []
    if (
      userRoles.indexOf(Roles.SuperUser) === -1 &&
      userRoles.indexOf(Roles.PortalAdmin) === -1
    ) {
      this.canAddPortalAccess = this.userAccessItems.length > 1
    }

    this.canAddPortalAccess = true
  }

  /**
   * Set subscription for portals data
   */
  private setPortalsQuerySubscription(): void {
    this.portalService
      .getPortals()
      .pipe(first())
      .subscribe({
        next: (data: Portal[]) => {
          this.portals = data
          this.initializeUserAccessItems(data)
        }
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
}
