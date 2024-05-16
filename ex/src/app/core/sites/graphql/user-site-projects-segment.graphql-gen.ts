import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { SiteProjectsSegmentFragmentDoc } from './shared-site-fragments.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UserSiteProjectsSegmentQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type UserSiteProjectsSegmentQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', sites: Array<{ __typename?: 'Site', projects: Array<{ __typename?: 'Project', segment: Types.Segment }> }> } | null } };

export const UserSiteProjectsSegmentDocument = gql`
    query userSiteProjectsSegment($id: UUID) {
  me {
    relatedPortalData {
      sites(where: {id: {eq: $id}}) {
        ...SiteProjectsSegment
      }
    }
  }
}
    ${SiteProjectsSegmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserSiteProjectsSegmentGQL extends Apollo.Query<UserSiteProjectsSegmentQuery, UserSiteProjectsSegmentQueryVariables> {
    document = UserSiteProjectsSegmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userSiteProjectsSegment: 'userSiteProjectsSegment'
  }
}