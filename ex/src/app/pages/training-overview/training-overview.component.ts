import { Component, inject } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { CmsGenericContentService } from '@core/cms-generic/cms-generic.service'
import { GenericItemFragment } from '@core/cms-generic/graphql/cms-generic-by-slug.graphql-gen'
import { CmsTrainingService } from '@core/cms-training-assortments/cms-training.service'
import { RecommendedAssortedTrainingItemFragment } from '@core/cms-training-assortments/graphql/cms-recommended-assorted-trainings.graphql-gen'
import { CertificationPathItemFragment } from '@core/cms-training-assortments/graphql/cms-shared-trainings-fragment.graphql-gen'
import { Scalars, Segment } from '@core/generated/types'
import { SitesService } from '@core/sites/sites.service'
import { getKeyByStringValue } from '@core/utility/utility'
import { Observable, combineLatest, filter, map, switchMap } from 'rxjs'

export interface RecommendedList {
  genericCertifications: GenericItemFragment
  recommendedAssortedTrainings: RecommendedAssortedTrainingItemFragment[]
}

export const GENERIC_CERTIFICATIONS_SLUG: string = 'certifications'

@Component({
  selector: 'app-training-overview',
  templateUrl: './training-overview.component.html'
})
export class TrainingOverviewComponent {
  private activatedRoute = inject(ActivatedRoute)
  private cmsGenericContentService = inject(CmsGenericContentService)
  private sitesService = inject(SitesService)
  private cmsTrainingService = inject(CmsTrainingService)

  public trainingCardImagePlaceholder =
    'assets/images/training-card-placeholder.png'

  private readonly siteId$: Observable<Scalars['UUID']> =
    this.activatedRoute.params.pipe(
      map((params: Params) => params.siteId),
      filter(Boolean)
    )

  public genericCertifications$: Observable<GenericItemFragment> =
    this.cmsGenericContentService.getGenericContentBySlug(
      GENERIC_CERTIFICATIONS_SLUG
    )

  public siteProjectsSegment$: Observable<Segment> = this.siteId$.pipe(
    switchMap(
      (siteId: string): Observable<Segment> =>
        this.sitesService.getSiteProjectsSegmentBasedOnRole(siteId).pipe(
          map((segment) => getKeyByStringValue(segment, Segment)),
          filter((segment): segment is Segment => !!segment)
        )
    )
  )

  public recommendedAssortedTrainings$: Observable<
    RecommendedAssortedTrainingItemFragment[]
  > = this.siteProjectsSegment$.pipe(
    switchMap((segment: Segment) =>
      this.cmsTrainingService.getRecommendedAssortedTrainings(segment)
    ),
    map(
      ({ data }) =>
        (data?.assortmentCollection?.items[0]?.trainingsCollection
          ?.items as RecommendedAssortedTrainingItemFragment[]) || []
    )
  )

  public recommendedList$ = combineLatest([
    this.genericCertifications$,
    this.recommendedAssortedTrainings$
  ]).pipe(
    map(
      ([
        genericCertifications,
        recommendedAssortedTrainings
      ]): RecommendedList => ({
        genericCertifications,
        recommendedAssortedTrainings
      })
    )
  )

  private readonly assortedTrainingIds$: Observable<string[]> =
    this.siteProjectsSegment$.pipe(
      switchMap(
        (segment: Segment): Observable<string[]> =>
          this.cmsTrainingService.getAssortedTrainingIds(segment)
      )
    )

  public certificationPaths$: Observable<CertificationPathItemFragment[]> =
    this.assortedTrainingIds$.pipe(
      switchMap((assortedTrainingId) =>
        this.cmsTrainingService
          .getCertificationPathByTrainingIds(assortedTrainingId)
          .pipe(
            map((data) => {
              if (!data.trainingCollection?.items) {
                return []
              }

              return data.trainingCollection.items.reduce<
                CertificationPathItemFragment[]
              >((acc, training) => {
                const certificationPath =
                  training?.linkedFrom?.certificationPathCollection?.items?.[0]
                if (!certificationPath) return acc

                return acc.some((x: any) => x.title === certificationPath.title)
                  ? acc
                  : [...acc, certificationPath]
              }, [])
            })
          )
      )
    )
}
