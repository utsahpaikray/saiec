import { Component, Input, OnChanges, OnDestroy } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { map } from 'rxjs/operators'
import { TranslocoService } from '@ngneat/transloco'

import { CurrentUserService } from '@core/current-user/current-user.service'
import { IdentityUser } from '@core/generated/types'
import { Roles } from '@core/interfaces/roles.enum'
import { CurrentUserFragment } from '@core/current-user/graphql/current-user.graphql-gen'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import {
  UserAuthorizationDocument,
  UserAuthorizationGQL,
  UserFragment,
  UserRoleFragment
} from '../../graphql/query/user-authorization.graphql-gen'
import { AddRoleToUserGQL } from '../../graphql/mutation/add-role-to-user.graphql-gen'
import {
  RemoveRoleFromUserGQL,
  RemoveRoleFromUserMutation
} from '../../graphql/mutation/remove-role-from-user.graphql-gen'
import { UserProfileFragment } from '../../graphql/query/user-profile.graphql-gen'
import { RoleDisplayContent } from './role-display-content.interface'
import { MutationResult } from 'apollo-angular'
import { RoleDisplayContentPipe } from '@core/pipes/role-display-content.pipe'

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.component.html'
})
export class UserAuthorizationComponent implements OnChanges, OnDestroy {
  @Input() public user: UserProfileFragment | CurrentUserFragment
  @Input() public myProfile = false

  public identityUser: UserFragment
  public roles: UserRoleFragment[]
  public currentRole: UserRoleFragment
  public selectedRole: UserRoleFragment
  public roleDisplayContents: RoleDisplayContent[] = []

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private addRoleToUserGQL: AddRoleToUserGQL,
    private removeRoleFromUserGQL: RemoveRoleFromUserGQL,
    private userAuthorizationGQL: UserAuthorizationGQL,
    private toastService: ToasterService,
    private translocoService: TranslocoService,
    private roleDisplayContentPipe: RoleDisplayContentPipe
  ) {}

  public ngOnChanges(): void {
    this.getUserData()
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  public onRoleChange(selectedRole: UserRoleFragment): void {
    if (this.currentRole?.id === selectedRole.id) return

    if (this.currentRole) {
      this.removeRoleFromUser(this.identityUser, this.currentRole).subscribe({
        next: ({ data }) => {
          if (data?.removeRoleFromUser) {
            this.addRoleToUser(this.identityUser, this.selectedRole)
          }
        },
        error: () => {
          this.selectedRole = this.currentRole
          this.showErrorToast()
        }
      })
    } else {
      this.addRoleToUser(this.identityUser, selectedRole)
    }
  }

  /**
   * Get roles for this user
   */
  private getUserData(): void {
    if (!this.user) return

    this.getUserRoleData().subscribe({
      next: (user: IdentityUser) => {
        this.identityUser = user
        this.roles = [...user.roles, ...user.assignableRoles]
        this.sortEmployeeRoles()
        this.currentRole = this.selectedRole = user.roles[0]
        this.setRoleDisplayContents()
      }
    })
  }

  /**
   * sort employee roles by custom sort order
   */
  private sortEmployeeRoles() {
    if (
      this.roles.some(
        (role: UserRoleFragment) =>
          role.name === Roles.PortalAdmin ||
          role.name === Roles.SuperUser ||
          role.name === Roles.VanderlandeUser
      )
    ) {
      const sortOrder = [
        Roles.VanderlandeUser,
        Roles.PortalAdmin,
        Roles.SuperUser
      ]
      this.customSortOrder(this.roles, sortOrder, 'name')
    }
  }

  /**
   * Sort array by custom order
   * @param {object[]} array
   * @param {string} sortProperty
   * @returns {object[]}
   */
  private customSortOrder(
    array: object[],
    sortOrder: string[],
    sortProperty: string
  ) {
    return array.sort((a: any, b: any) => {
      return (
        sortOrder.indexOf(a[sortProperty]) - sortOrder.indexOf(b[sortProperty])
      )
    })
  }

  /**
   * Get roles of profile user
   * @returns {Observable<IdentityUser>}
   */
  private getUserRoleData(): Observable<IdentityUser> {
    return this.userAuthorizationGQL
      .fetch({
        userId: this.user.id
      })
      .pipe(map((result) => result.data.user as IdentityUser))
  }

  /**
   * Set role display contents, and which checkboxes should be enabled
   */
  private setRoleDisplayContents(): void {
    this.roleDisplayContents = [
      {
        id: Roles.SuperUser,
        label: 'Vanderlande Superuser',
        description: this.translocoService.translate(
          'UserAuthorization.SuperUserMessage'
        ),
        isDisabled: this.myProfile
      },
      {
        id: Roles.PortalAdmin,
        label: 'Vanderlande Portal Admin',
        description: this.translocoService.translate(
          'UserAuthorization.PortalAdminMessage'
        ),
        isDisabled: this.myProfile
      },
      {
        id: Roles.VanderlandeUser,
        label: 'Vanderlande User',
        description: this.translocoService.translate(
          'UserAuthorization.VanderlandeUserMessage'
        ),
        isDisabled: this.myProfile
      },
      {
        id: Roles.User,
        label: 'Customer User',
        description: this.translocoService.translate(
          'UserAuthorization.CustomerMessage'
        ),
        isDisabled: this.myProfile
      }
    ]
  }

  /**
   * Add role to user
   */
  private addRoleToUser(
    identityUser: UserFragment,
    role: UserRoleFragment
  ): void {
    this.addRoleToUserGQL
      .mutate(
        {
          userId: identityUser.id,
          roleId: role.id
        },
        {
          refetchQueries: [
            {
              query: UserAuthorizationDocument,
              variables: { userId: this.user.id }
            }
          ]
        }
      )
      .subscribe({
        next: ({ data }) => {
          if (data?.addRoleToUser) {
            this.currentRole = this.selectedRole || role
            const message = this.translocoService.translate(
              'UserAuthorization.RoleAssigned',
              {
                role:
                  this.roleDisplayContentPipe.transform(
                    this.selectedRole,
                    this.roleDisplayContents
                  )?.label || role.name
              }
            )
            const success = new Toast('success', message)
            this.toastService.addToast(success)
          }
        },
        error: () => {
          this.selectedRole = this.currentRole
          this.showErrorToast()
        }
      })
  }

  /**
   * Remove role from user
   */
  private removeRoleFromUser(
    identityUser: UserFragment,
    role: UserRoleFragment
  ): Observable<MutationResult<RemoveRoleFromUserMutation>> {
    return this.removeRoleFromUserGQL.mutate({
      userId: identityUser.id,
      roleId: role.id
    })
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
