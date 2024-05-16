import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ApolloQueryResult } from '@apollo/client/core'
import { PreviousUrlService } from '@core/previous-url/previous-url.service'
import { TranslocoService } from '@ngneat/transloco'
import { combineLatest, Observable, of, Subject } from 'rxjs'
import { filter, map, switchMap, takeUntil } from 'rxjs/operators'
import {
  TrainingDetailCertificationPathGQL,
  TrainingDetailCertificationPathQuery
} from './graphql/cms-training-detail-certification-path.graphql-gen'
import {
  TrainingDetailGQL,
  TrainingDetailItemFragment,
  TrainingDetailQuery,
  TrainingDetailModuleFragment
} from './graphql/cms-training-detail.graphql-gen'
import {
  CertificationPathItemFragment,
  TrainingImageFragment
} from '@core/cms-training-assortments/graphql/cms-shared-trainings-fragment.graphql-gen'

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html'
})
export class TrainingDetailComponent implements OnInit, OnDestroy {
  public training: TrainingDetailItemFragment | undefined | null
  public modules: TrainingDetailModuleFragment[] | null
  public image: TrainingImageFragment | null
  public backLink: {
    title: string
    url: string
  }

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private activatedRoute: ActivatedRoute,
    private previousUrlService: PreviousUrlService,
    private router: Router,
    private trainingDetailGQL: TrainingDetailGQL,
    private trainingDetailCertificationPathGQL: TrainingDetailCertificationPathGQL,
    private translocoService: TranslocoService
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((params: Params) => {
          return combineLatest([
            this.getTrainingDetails(params.trainingId),
            this.getTrainingCertificationPath(params.certificateId)
          ])
        })
      )
      .subscribe(([training, certificationPath]: [any, any]) => {
        this.training = training
        this.modules =
          (training?.trainingModulesCollection
            ?.items as TrainingDetailModuleFragment[]) || []
        this.image = training?.pageImageCollection?.items[0] || null

        this.setBackLink(certificationPath as CertificationPathItemFragment)
      })
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * Navigate to request page
   */
  public goToRequestPage() {
    this.router.navigate([`./request`], { relativeTo: this.activatedRoute })
  }

  /**
   * Get training details
   * @param {string} trainingId
   * @returns {Observable<TrainingDetailItemFragment>}
   */
  private getTrainingDetails(
    trainingId: string
  ): Observable<TrainingDetailItemFragment> {
    return this.trainingDetailGQL
      .fetch({
        id: trainingId
      })
      .pipe(
        map(
          (result: ApolloQueryResult<TrainingDetailQuery>) =>
            result.data.training
        ),
        filter(Boolean)
      )
  }

  /**
   * Get training details
   * @param {string} certificateId
   * @returns {Observable<TrainingDetailCertificationPathItemFragment>}
   */
  private getTrainingCertificationPath(
    certificateId: string
  ): Observable<CertificationPathItemFragment | null> {
    if (!certificateId) {
      return of(null)
    }
    return this.trainingDetailCertificationPathGQL
      .fetch({
        id: certificateId
      })
      .pipe(
        map(
          (result: ApolloQueryResult<TrainingDetailCertificationPathQuery>) =>
            result.data.certificationPath
        ),
        filter(Boolean)
      )
  }

  /**
   * Set correct back link.
   * Check previous url if it was either, 'certifications' or 'training'.
   * Otherwise redirect to certification path page
   * @param {CertificationPathItemFragment} certificationPath
   */
  private setBackLink(certificationPath: CertificationPathItemFragment): void {
    const lastUrlPart = this.previousUrlService.url?.split('/').pop() || ''
    if (lastUrlPart === 'certifications') {
      this.backLink = {
        title: this.translocoService.translate('Training.Certifications'),
        url: '../../certifications'
      }
      return
    }

    if (certificationPath && lastUrlPart !== 'training') {
      this.backLink = {
        title: `${certificationPath?.title || ''} ${this.translocoService
          .translate('Training.CertificationPath')
          .toLowerCase()}`,
        url: '../'
      }
      return
    }

    this.backLink = {
      title: this.translocoService.translate('Training.TrainingBackBtn'),
      url: '../../'
    }
  }
}
