import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ProjectSegmentFragmentFragment = { __typename?: 'Project', segment: Types.Segment };

export type SiteFragmentFragment = { __typename?: 'Site', contractVisible: boolean, id: any, name: string, published: boolean, sourceId: string, projects: Array<{ __typename?: 'Project', segment: Types.Segment }> };

export type UserSitesByPortalIdQueryVariables = Types.Exact<{
  portalId: Types.Scalars['UUID'];
}>;


export type UserSitesByPortalIdQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessibleSites: Array<{ __typename?: 'Site', contractVisible: boolean, id: any, name: string, published: boolean, sourceId: string, projects: Array<{ __typename?: 'Project', segment: Types.Segment }> }> } | null } };

export const ProjectSegmentFragmentFragmentDoc = gql`
    fragment ProjectSegmentFragment on Project {
  segment
}
    `;
export const SiteFragmentFragmentDoc = gql`
    fragment SiteFragment on Site {
  contractVisible
  id
  name
  projects {
    ...ProjectSegmentFragment
  }
  published
  sourceId
}
    ${ProjectSegmentFragmentFragmentDoc}`;
export const UserSitesByPortalIdDocument = gql`
    query userSitesByPortalId($portalId: UUID!) {
  me {
    relatedPortalData {
      AccessibleSites(order: {name: ASC}, where: {portal: {id: {eq: $portalId}}}) {
        ...SiteFragment
      }
    }
  }
}
    ${SiteFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserSitesByPortalIdGQL extends Apollo.Query<UserSitesByPortalIdQuery, UserSitesByPortalIdQueryVariables> {
    document = UserSitesByPortalIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userSitesByPortalId: 'userSitesByPortalId'
  },
  Fragment: {
    ProjectSegmentFragment: 'ProjectSegmentFragment',
    SiteFragment: 'SiteFragment'
  }
}