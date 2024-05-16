import { Injectable, inject } from '@angular/core'
import { Observable, filter, map } from 'rxjs'
import { ApolloQueryResult } from '@apollo/client/core'
import {
  GenericContentBySlugGQL,
  GenericContentBySlugQuery,
  GenericItemFragment
} from './graphql/cms-generic-by-slug.graphql-gen'

@Injectable({
  providedIn: 'root'
})
export class CmsGenericContentService {
  private genericContentBySlugGQL = inject(GenericContentBySlugGQL)
  /**
   * Fetch Certifications Generic Content Type from CMS
   * @returns {Observable<GenericItemFragment>}
   */
  public getGenericContentBySlug(
    slug: string
  ): Observable<GenericItemFragment> {
    return this.genericContentBySlugGQL
      .fetch({
        slug
      })
      .pipe(
        map(
          (result: ApolloQueryResult<GenericContentBySlugQuery>) =>
            result.data.genericCollection?.items[0]
        ),
        filter(Boolean)
      )
  }
}
