import { inject, Injectable } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { Segment } from '@core/generated/types'
import { filter, map, Observable } from 'rxjs'
import {
  AssortedTrainingIdsGQL,
  AssortedTrainingIdsQuery
} from './graphql/cms-assorted-training-ids.graphql-gen'
import {
  AssortedTrainingsByCertificationPathGQL,
  AssortedTrainingsByCertificationPathQuery
} from './graphql/cms-assorted-trainings-by-certification-path.graphql-gen'
import {
  CertificationPathsGQL,
  CertificationPathsQuery,
  TrainingRequestCertificationPathCollectionFragment
} from './graphql/cms-certification-paths.graphql-gen'
import {
  RecommendedAssortedTrainingGQL,
  RecommendedAssortedTrainingQuery
} from './graphql/cms-recommended-assorted-trainings.graphql-gen'
import {
  CertificationPathByTrainingIdsGQL,
  CertificationPathByTrainingIdsQuery
} from './graphql/cms-certification-path-by-training-ids.graphql-gen'

@Injectable({
  providedIn: 'root'
})
export class CmsTrainingService {
  private recommendedAssortedTrainingGQL = inject(
    RecommendedAssortedTrainingGQL
  )
  private assortedTrainingIdsGQL = inject(AssortedTrainingIdsGQL)
  private assortedTrainingsByCertificationPathGQL = inject(
    AssortedTrainingsByCertificationPathGQL
  )
  private certificationPathsGQL = inject(CertificationPathsGQL)
  private certificationPathByTrainingIdsGQL = inject(
    CertificationPathByTrainingIdsGQL
  )

  /**
   * Get recommended assorted trainings by segment
   * @param {Segment} segment
   * @returns {Observable<ApolloQueryResult<RecommendedAssortedTrainingQuery>>}
   */
  public getRecommendedAssortedTrainings(
    segment: Segment
  ): Observable<ApolloQueryResult<RecommendedAssortedTrainingQuery>> {
    return this.recommendedAssortedTrainingGQL.watch(
      {
        segment
      },
      { useInitialLoading: true }
    ).valueChanges
  }

  /**
   * Get assorted training ids by segment
   * @param {Segment} segment
   * @returns {Observable<string[]>}
   */
  public getAssortedTrainingIds(segment: Segment): Observable<string[]> {
    return this.assortedTrainingIdsGQL
      .fetch({
        segment
      })
      .pipe(
        map((result: ApolloQueryResult<AssortedTrainingIdsQuery>) =>
          result.data.assortmentCollection?.items[0]?.trainingsCollection?.items.map(
            (item) => item?.sys.id || ''
          )
        ),
        filter(Boolean)
      )
  }

  /**
   * Get certification path by training ids
   * @param {string[]} trainingIds
   * @returns {Observable<CertificationPathByTrainingIdsQuery>}
   */
  public getCertificationPathByTrainingIds(
    trainingIds: string[]
  ): Observable<CertificationPathByTrainingIdsQuery> {
    return this.certificationPathByTrainingIdsGQL
      .fetch({
        trainingIds
      })
      .pipe(
        map(
          (result: ApolloQueryResult<CertificationPathByTrainingIdsQuery>) =>
            result.data
        )
      )
  }

  /**
   * Get certification path and assorted trainings by certification path id
   * @param {string} certificationPathId
   * @param {string[]} assortedTrainingIds
   * @returns {Observable<AssortedTrainingsByCertificationPathQuery>}
   */
  public getCertificationPathAndAssortedTrainings(
    certificationPathId: string,
    assortedTrainingIds: string[]
  ): Observable<AssortedTrainingsByCertificationPathQuery> {
    return this.assortedTrainingsByCertificationPathGQL
      .fetch({
        certificationPathId,
        assortedTrainingIds
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<AssortedTrainingsByCertificationPathQuery>
          ) => result.data
        )
      )
  }

  /**
   * Get certification paths
   * @returns {Observable<TrainingRequestCertificationPathCollectionFragment>}
   */
  public getCertificationPaths(): Observable<TrainingRequestCertificationPathCollectionFragment> {
    return this.certificationPathsGQL.fetch().pipe(
      map(
        (result: ApolloQueryResult<CertificationPathsQuery>) =>
          result.data.certificationPathCollection
      ),
      filter(Boolean)
    )
  }
}
