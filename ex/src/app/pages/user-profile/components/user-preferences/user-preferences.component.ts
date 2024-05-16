import { Component, Input, OnInit, inject } from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'

import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { CookiebotService } from '@core/cookiebot/cookiebot.service'
import { CurrentUserFragment } from '@core/current-user/graphql/current-user.graphql-gen'
import { localeList } from '@core/locale/locale-list'
import { Locale } from '@core/locale/locale.interface'
import { environment } from '@environments/environment'
import { ChangeUserLanguageGQL } from '../../graphql/mutation/change-user-language.graphql-gen'
import { MyUserProfileDocument } from '../../graphql/query/my-user-profile.graphql-gen'
import {
  UserProfileDocument,
  UserProfileFragment
} from '../../graphql/query/user-profile.graphql-gen'

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html'
})
export class UserPreferencesComponent implements OnInit {
  @Input() public myProfile = false
  @Input() public user: UserProfileFragment | CurrentUserFragment | null
  private changeUserLanguageGQL = inject(ChangeUserLanguageGQL)
  private cookiebotService = inject(CookiebotService)
  private toastService = inject(ToasterService)
  private translocoService = inject(TranslocoService)

  public selectedLanguage: string | null = null
  public defaultLanguage = this.translocoService.getDefaultLang()
  public locales: Locale[] = localeList
  public cookiePolicyLink = environment.cookiePolicyUrl
  public privacyPolicyLink = environment.privacyPolicyUrl

  /**
   * On init set super user observable
   */
  public ngOnInit(): void {
    this.setSelectedLanguage()
  }

  /**
   * Call graphql mutation to set user language
   */
  public onLanguageChange(language: string): void {
    const userProfileQuery = this.myProfile
      ? { query: MyUserProfileDocument }
      : { query: UserProfileDocument, variables: { userId: this.user?.id } }

    this.changeUserLanguageGQL
      .mutate(
        {
          userId: this.user?.id,
          language
        },
        {
          refetchQueries: [userProfileQuery]
        }
      )
      .subscribe({
        next: ({ data }) => {
          if (data?.changeUserLanguage) {
            this.updateLanguage(language)
          }
        },
        error: () => {
          this.showErrorToast()
          this.resetSelectedLanguage()
        }
      })
  }

  /**
   * Open cookiebot cookie consent banner
   */
  public openCookieConsent(): void {
    this.cookiebotService.renew()
  }

  /**
   * Set correct selected language from user
   */
  private setSelectedLanguage(): void {
    this.selectedLanguage = this.user?.language || this.defaultLanguage
  }

  /**
   * After saving new language, show success message
   * and update application language if this is current users profile
   */
  private updateLanguage(language: string): void {
    if (this.myProfile) {
      this.translocoService.load(language).subscribe(() => {
        this.translocoService.setActiveLang(language)
        this.showSuccessToast()
      })
    } else {
      this.showSuccessToast()
    }
  }

  /**
   * Reset selected language to currently active language
   */
  private resetSelectedLanguage(): void {
    const activeLanguage = this.user?.language

    if (activeLanguage) {
      this.selectedLanguage = activeLanguage
    }
  }

  /**
   * Show success toast
   */
  private showSuccessToast(): void {
    const success = new Toast(
      'success',
      this.translocoService.translate('UserProfile.LanguageUpdated')
    )
    this.toastService.addToast(success)
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
