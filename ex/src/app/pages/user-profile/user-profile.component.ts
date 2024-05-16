import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { Observable, Subject, of } from 'rxjs'
import { first, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators'

import { CommonModule } from '@angular/common'
import { ComponentsModule } from '@components/components.module'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { CurrentUserFragment } from '@core/current-user/graphql/current-user.graphql-gen'
import { Scalars } from '@core/generated/types'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { TranslocoService } from '@ngneat/transloco'
import { UserAccessModule } from './components/user-access/user-access.module'
import { UserAuthorizationModule } from './components/user-authorization/user-authorization.module'
import { UserPreferencesModule } from './components/user-preferences/user-preferences.module'
import {
  MyUserProfileGQL,
  MyUserProfileQuery
} from './graphql/query/my-user-profile.graphql-gen'
import {
  UserProfileFragment,
  UserProfileGQL,
  UserProfileQuery
} from './graphql/query/user-profile.graphql-gen'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    ProgressSpinnerModule,
    UserAuthorizationModule,
    UserAccessModule,
    UserPreferencesModule,
    DefaultTemplateModule,
    TranslocoRootModule
  ],
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public isSuperUser = false
  public title = 'UserProfile.Title'
  public user: UserProfileFragment | CurrentUserFragment | null
  public userId: string | null
  public myProfile = false

  public backLink: {
    title: string
    url: string
  }

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private currentUserService: CurrentUserService,
    private myUserProfileGQL: MyUserProfileGQL,
    private route: ActivatedRoute,
    private router: Router,
    private translocoService: TranslocoService,
    private userProfileGQL: UserProfileGQL
  ) {}

  /**
   * On init subscribe to query
   */
  public ngOnInit(): void {
    this.currentUserService.userData$.pipe(first()).subscribe({
      next: () => (this.isSuperUser = this.currentUserService.isSuperUser),
      error: () => (this.isSuperUser = false)
    })

    this.setQuerySubscription()

    const homeBackLink = {
      title: this.translocoService.translate('General.Dashboard'),
      url: '/'
    }
    this.backLink = history.state?.backLink || homeBackLink
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * get user id
   */
  public getUserId(): Observable<string> {
    return this.route.params.pipe(
      mergeMap((params: Params) => {
        if (params['id']) {
          return of(params['id'].toLowerCase() as string)
        } else if (this.router.url === '/myprofile') {
          return this.currentUserService.userData$.pipe(map((user) => user.id))
        } else {
          return ''
        }
      })
    )
  }

  /**
   * Set subscription for User profile data
   */
  private setQuerySubscription(): void {
    this.route.params
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((params: Params) => {
          this.myProfile = params['id'] === undefined
          this.setTitle()
        }),
        switchMap((params: Params) => {
          if (params['id']) {
            return this.getUserProfileData(params['id'].toLowerCase())
          }
          return this.getMyUserProfileData()
        })
      )
      .subscribe({
        next: (user: UserProfileFragment | CurrentUserFragment) => {
          this.userId = user.id?.toLowerCase()
          this.user = user
        },
        error: () => (this.user = null)
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
   *Get user data from me endpoint
   */
  private getMyUserProfileData(): Observable<UserProfileFragment> {
    return this.myUserProfileGQL.watch().valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      map((result: ApolloQueryResult<MyUserProfileQuery>) => result.data.me)
    )
  }

  /**
   * Set correct title this is current user profile
   */
  private setTitle(): void {
    this.title = this.myProfile ? 'General.MyProfile' : 'UserProfile.Title'
  }
}
