import { Component, inject } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { CmsTrainingService } from '@core/cms-training-assortments/cms-training.service'
import { CertificationPathWithAssortedTrainingFragment } from '@core/cms-training-assortments/graphql/cms-assorted-trainings-by-certification-path.graphql-gen'
import { Scalars, Segment } from '@core/generated/types'
import { SitesService } from '@core/sites/sites.service'
import { getKeyByStringValue } from '@core/utility/utility'
import { Observable, combineLatest, filter, map, switchMap } from 'rxjs'

@Component({
  selector: 'app-training-certification-path',
  templateUrl: './training-certification-path.component.html'
})
export class TrainingCertificationPathComponent {
  private activatedRoute = inject(ActivatedRoute)
  private sitesService = inject(SitesService)
  private cmsTrainingService = inject(CmsTrainingService)

  private readonly siteId$: Observable<Scalars['UUID']> =
    this.activatedRoute.params.pipe(
      map((params: Params) => params.siteId),
      filter(Boolean)
    )

  private readonly siteProjectsSegment$: Observable<Segment> =
    this.siteId$.pipe(
      switchMap(
        (siteId: string): Observable<Segment> =>
          this.sitesService.getSiteProjectsSegmentBasedOnRole(siteId).pipe(
            map((segment) => getKeyByStringValue(segment, Segment)),
            filter((segment): segment is Segment => !!segment)
          )
      )
    )

  private readonly assortedTrainingIds$: Observable<string[]> =
    this.siteProjectsSegment$.pipe(
      switchMap(
        (segment: Segment): Observable<string[]> =>
          this.cmsTrainingService.getAssortedTrainingIds(segment)
      )
    )

  private readonly certificateId$: Observable<Scalars['UUID']> =
    this.activatedRoute.params.pipe(
      map((params: Params) => params.certificateId),
      filter(Boolean)
    )

  public certificationPath$: Observable<CertificationPathWithAssortedTrainingFragment> =
    combineLatest([this.certificateId$, this.assortedTrainingIds$]).pipe(
      switchMap(
        ([
          certificateId,
          assortedTrainingIds
        ]): Observable<CertificationPathWithAssortedTrainingFragment> =>
          this.cmsTrainingService
            .getCertificationPathAndAssortedTrainings(
              certificateId,
              assortedTrainingIds
            )
            .pipe(
              map(
                (data) =>
                  data.certificationPath as CertificationPathWithAssortedTrainingFragment
              )
            )
      )
    )
}
