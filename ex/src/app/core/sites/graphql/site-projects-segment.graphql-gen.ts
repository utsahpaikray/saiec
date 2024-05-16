import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { SiteProjectsSegmentFragmentDoc } from './shared-site-fragments.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteProjectsSegmentQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type SiteProjectsSegmentQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', projects: Array<{ __typename?: 'Project', segment: Types.Segment }> }> };

export const SiteProjectsSegmentDocument = gql`
    query siteProjectsSegment($id: UUID) {
  sites(where: {id: {eq: $id}}) {
    ...SiteProjectsSegment
  }
}
    ${SiteProjectsSegmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteProjectsSegmentGQL extends Apollo.Query<SiteProjectsSegmentQuery, SiteProjectsSegmentQueryVariables> {
    document = SiteProjectsSegmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteProjectsSegment: 'siteProjectsSegment'
  }
}