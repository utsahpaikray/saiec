import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { SiteSparePartsFragmentDoc, SiteVidiFragmentDoc } from './site-navigation.graphql-gen';
import { SiteProjectsSegmentFragmentDoc } from './shared-site-fragments.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UserSiteNavigationQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type UserSiteNavigationQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', sites: Array<{ __typename?: 'Site', contractVisible: boolean, sparePartsShopConfig: { __typename?: 'SparePartsShopConfig', enabled: boolean }, vidiConfig: { __typename?: 'VidiConfig', enabled: boolean }, projects: Array<{ __typename?: 'Project', segment: Types.Segment }> }> } | null } };

export const UserSiteNavigationDocument = gql`
    query userSiteNavigation($siteId: UUID!) {
  me {
    relatedPortalData {
      sites(where: {id: {eq: $siteId}}) {
        ...SiteSpareParts
        ...SiteVidi
        ...SiteProjectsSegment
        contractVisible
      }
    }
  }
}
    ${SiteSparePartsFragmentDoc}
${SiteVidiFragmentDoc}
${SiteProjectsSegmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserSiteNavigationGQL extends Apollo.Query<UserSiteNavigationQuery, UserSiteNavigationQueryVariables> {
    document = UserSiteNavigationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userSiteNavigation: 'userSiteNavigation'
  }
}