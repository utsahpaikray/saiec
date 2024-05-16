import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { FetchResult } from '@apollo/client/core'
import { TranslocoService } from '@ngneat/transloco'
import { take } from 'rxjs'

import { Alert } from '@components/alert/alert.model'
import { ModalService } from '@components/modal/modal.service'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { GraphUser } from '@core/generated/types'
import { UserFragment } from '@pages/user-profile/graphql/query/user-authorization.graphql-gen'
import {
  AddUserGQL,
  AddUserMutation
} from './graphql/mutation/add-user.graphql-gen'
import { ExternalUserAccountGQL } from './graphql/query/external-user-account.graphql-gen'
import { UserByUsernameGQL } from './graphql/query/get-user-by-username.graphql-gen'
import { AllUsersDocument } from '@core/users/graphql/users.query.graphql-gen'
import { AddUserForm } from './add-user-form.interface'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  public externalUserAccount: GraphUser | null
  public identityUser: UserFragment | null
  public loading: Boolean = false
  public sharePointUrl =
    'https://vanderlande.sharepoint.com/sites/sharingportal/management/SitePages/Home.aspx'
  private isAdded: Boolean = false
  public addUserForm: AddUserForm

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private router: Router,
    private currentUserService: CurrentUserService,
    private translocoService: TranslocoService,
    private externalUserAccountGQL: ExternalUserAccountGQL,
    private getUserByUsernameGQL: UserByUsernameGQL,
    private addUserGQL: AddUserGQL,
    private toastService: ToasterService,
    private formBuilder: FormBuilder
  ) {
    this.initializeForm()
  }

  infoAlert = new Alert(
    'information',
    this.translocoService.translate('AddUserModal.AddUserMsg1')
  )

  warningAlert = new Alert(
    'warning',
    this.translocoService.translate('AddUserModal.AddUserMsg2')
  )

  disabledUserAlert = new Alert(
    'error',
    this.translocoService.translate('AddUserModal.DisabledUserError')
  )

  /**
   * Initiialize add user form
   */
  private initializeForm(): void {
    this.addUserForm = this.formBuilder.nonNullable.group(
      {
        upnId: ['', [Validators.email]]
      },
      { updateOn: 'submit' }
    ) as AddUserForm
  }

  /**
   * click on action button
   */
  public onActionButtonClick(): void {
    // show link to sharepoint if user doesn't exist
    if (!this.externalUserAccount) {
      this.goToSharePointUrl()
    }
    // show link to profile page if user exists and is added to my vanderlande
    if (this.externalUserAccount && this.identityUser) {
      this.goToUserProfilePage()
    }
    // if user exists and is NOT added to my vanderlande
    if (this.externalUserAccount && !this.identityUser) {
      this.addUser(this.externalUserAccount)
    }
  }

  /**
   * Run mutation to add user to my vanderlande
   * @param {GraphUser} externalUserAccount
   * @returns {Observable<Mutation>}
   */
  public addUser(externalUserAccount: GraphUser) {
    this.addUserGQL
      .mutate(
        {
          upn: externalUserAccount.username || ''
        },
        {
          refetchQueries: [
            {
              query: AllUsersDocument,
              variables: { searchText: '' }
            }
          ]
        }
      )
      .subscribe({
        next: (
          res: FetchResult<
            AddUserMutation,
            Record<string, any>,
            Record<string, any>
          >
        ) => {
          if (res.data?.addUser) {
            this.showSuccessMessage()
            this.isAdded = true
            this.getUserByUsername(this.addUserForm.value.upnId as string)
            this.resetData()
          }
        },
        error: () => this.showErrorToast()
      })
  }

  /**
   * show success message on toast component
   */
  private showSuccessMessage(): void {
    const displayName =
      this.externalUserAccount?.firstName && this.externalUserAccount?.lastName
        ? `${this.externalUserAccount?.firstName} ${this.externalUserAccount?.lastName}`
        : this.externalUserAccount?.username

    const message = this.translocoService.translate(
      'AddUserModal.AddUserSuccessMsg',
      {
        name: displayName
      }
    )
    const success = new Toast('success', message)
    this.toastService.addToast(success)
  }

  /**
   * Redirect to user profile page with user id
   */
  private goToUserProfilePage(): void {
    if (!this.identityUser?.id) return

    this.currentUserService.userData$.pipe(take(1)).subscribe({
      next: (userData) => {
        if (userData.id === this.identityUser?.id) {
          this.navigateTo(
            `/myprofile`,
            `..${this.router.routerState.snapshot.url}`
          )
          return
        }
        this.navigateTo(
          `./${this.identityUser?.id}`,
          `../`,
          this.activatedRoute
        )
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
   * redirect to share point external url
   */
  private goToSharePointUrl(): void {
    window.open(this.sharePointUrl, '_blank')
  }

  /**
   * open modal
   */
  public openModal(id: string): void {
    this.modalService.open(id)
  }

  /**
   * close modal by clicking cancel button
   */
  public closeModal(id: string): void {
    this.modalService.close(id)
    this.resetData()
  }

  /**
   * reset page data
   */
  public resetData(): void {
    this.addUserForm.reset()
    this.externalUserAccount = null
    this.identityUser = null
    this.loading = false
  }

  /**
   * get external user account by upn id when submitting a valid form
   */
  public onSubmit(): void {
    if (!this.addUserForm.valid) return
    this.getExternalUserAccountByUpnId(this.addUserForm.value.upnId as string)
  }

  /**
   * Get identity user id by username from our app my vanderlande in identity service
   * @param {string} username
   */
  private getUserByUsername(username: string) {
    this.loading = true
    return this.getUserByUsernameGQL
      .fetch({
        username: username
      })
      .subscribe({
        next: ({ data, loading }) => {
          this.loading = loading
          this.identityUser = data?.userByUsername

          if (this.identityUser.id && this.isAdded) {
            this.goToUserProfilePage()
          }
        },
        error: () => {
          this.loading = false
          this.identityUser = null
        }
      })
  }

  /**
   * Get external user account from active directory where vanderlande accounts are created
   * @param {string} upnId
   */
  public getExternalUserAccountByUpnId(upnId: string): any {
    if (!upnId) return

    this.loading = true
    this.externalUserAccountGQL
      .fetch({
        upn: upnId
      })
      .subscribe({
        next: ({ data, loading }) => {
          this.loading = loading
          this.externalUserAccount = data?.externalUserAccount
          // if user exists, check if he/she is added to my vanderlande
          this.getUserByUsername(upnId)
        },
        error: () => {
          this.loading = false
          this.externalUserAccount = null
        }
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

  /**
   * Check if form control input is valid
   * @param {AbstractControl} input
   * @returns {boolean}
   */
  public isInvalid(control: string): boolean {
    const input = this.addUserForm.get(control) as AbstractControl
    return input.invalid && input.touched
  }
}
