import { Component, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { Toast } from '@components/toaster/toast/toast.model'
import { ToasterService } from '@components/toaster/toaster.service'
import { TranslocoService } from '@ngneat/transloco'
import { Store } from '@ngrx/store'
import { currentUserFeature } from '@stores/current-user/current-user.state'

import { catchError, filter, map, of } from 'rxjs'
import {
  GenericTermsAndConditionsFragment,
  TermsAndConditionsGQL,
  TermsAndConditionsQuery
} from './graphql/cms-terms-and-conditions.graphql-gen'

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html'
})
export class TermsAndConditionsComponent {
  private termsAndConditionsGQL = inject(TermsAndConditionsGQL)
  private translocoService = inject(TranslocoService)
  private toastService = inject(ToasterService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private store = inject(Store)

  public isAuthenticated$ = this.store
    .select(currentUserFeature.selectIsAuthenticated)
    .pipe(filter((isAuthenticated) => isAuthenticated !== null))

  public isFooterVisible$ = this.isAuthenticated$.pipe(
    map((isAuthenticated) => !isAuthenticated)
  )

  /**
   * Get terms and conditions page contents
   * @returns {Observable<GenericTermsAndConditionsFragment[]>}
   */
  public genericTermsAndConditions$ = this.termsAndConditionsGQL.fetch().pipe(
    map(
      (result: ApolloQueryResult<TermsAndConditionsQuery>) =>
        (result.data?.genericCollection
          ?.items as GenericTermsAndConditionsFragment[]) || []
    ),
    catchError(() => {
      this.showErrorToast()
      return of(null)
    })
  )

  /**
   * Show error toast
   */
  private showErrorToast(): void {
    const message = this.translocoService.translate('General.ApiError')
    const error = new Toast('error', message)
    this.toastService.addToast(error)
  }

  /**
   * Navigate to relative page based on clicked link
   */
  public goToRelativePage(link: string): void {
    this.router.navigate([`./${link}`], { relativeTo: this.activatedRoute })
  }
}
