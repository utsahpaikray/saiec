import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { SiteProjectsSegmentFragmentDoc } from './shared-site-fragments.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SiteSparePartsFragment = { __typename?: 'Site', sparePartsShopConfig: { __typename?: 'SparePartsShopConfig', enabled: boolean } };

export type SiteSparePartsConfigFragment = { __typename?: 'SparePartsShopConfig', enabled: boolean };

export type SiteVidiFragment = { __typename?: 'Site', vidiConfig: { __typename?: 'VidiConfig', enabled: boolean } };

export type SiteVidiConfigFragment = { __typename?: 'VidiConfig', enabled: boolean };

export type SiteNavigationQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteNavigationQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', contractVisible: boolean, sparePartsShopConfig: { __typename?: 'SparePartsShopConfig', enabled: boolean }, vidiConfig: { __typename?: 'VidiConfig', enabled: boolean }, projects: Array<{ __typename?: 'Project', segment: Types.Segment }> }> };

export type SiteDivertHealthFragment = { __typename?: 'Site', divertHealthConfig: { __typename?: 'DivertHealthConfig', enabled: boolean } };

export type SiteDivertHealthConfigFragment = { __typename?: 'DivertHealthConfig', enabled: boolean };

export type SiteNavigationAccessibleSitesQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteNavigationAccessibleSitesQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', AccessibleSites: Array<{ __typename?: 'Site', contractVisible: boolean, sparePartsShopConfig: { __typename?: 'SparePartsShopConfig', enabled: boolean }, vidiConfig: { __typename?: 'VidiConfig', enabled: boolean }, projects: Array<{ __typename?: 'Project', segment: Types.Segment }>, divertHealthConfig: { __typename?: 'DivertHealthConfig', enabled: boolean } }> } | null } };

export const SiteSparePartsConfigFragmentDoc = gql`
    fragment SiteSparePartsConfig on SparePartsShopConfig {
  enabled
}
    `;
export const SiteSparePartsFragmentDoc = gql`
    fragment SiteSpareParts on Site {
  sparePartsShopConfig {
    ...SiteSparePartsConfig
  }
}
    ${SiteSparePartsConfigFragmentDoc}`;
export const SiteVidiConfigFragmentDoc = gql`
    fragment SiteVidiConfig on VidiConfig {
  enabled
}
    `;
export const SiteVidiFragmentDoc = gql`
    fragment SiteVidi on Site {
  vidiConfig {
    ...SiteVidiConfig
  }
}
    ${SiteVidiConfigFragmentDoc}`;
export const SiteDivertHealthConfigFragmentDoc = gql`
    fragment SiteDivertHealthConfig on DivertHealthConfig {
  enabled
}
    `;
export const SiteDivertHealthFragmentDoc = gql`
    fragment SiteDivertHealth on Site {
  divertHealthConfig {
    ...SiteDivertHealthConfig
  }
}
    ${SiteDivertHealthConfigFragmentDoc}`;
export const SiteNavigationDocument = gql`
    query siteNavigation($siteId: UUID!) {
  sites(where: {id: {eq: $siteId}}) {
    ...SiteSpareParts
    ...SiteVidi
    ...SiteProjectsSegment
    contractVisible
  }
}
    ${SiteSparePartsFragmentDoc}
${SiteVidiFragmentDoc}
${SiteProjectsSegmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteNavigationGQL extends Apollo.Query<SiteNavigationQuery, SiteNavigationQueryVariables> {
    document = SiteNavigationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SiteNavigationAccessibleSitesDocument = gql`
    query siteNavigationAccessibleSites($siteId: UUID!) {
  me {
    relatedPortalData {
      AccessibleSites(where: {id: {eq: $siteId}}) {
        ...SiteSpareParts
        ...SiteVidi
        ...SiteProjectsSegment
        ...SiteDivertHealth
        contractVisible
      }
    }
  }
}
    ${SiteSparePartsFragmentDoc}
${SiteVidiFragmentDoc}
${SiteProjectsSegmentFragmentDoc}
${SiteDivertHealthFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class SiteNavigationAccessibleSitesGQL extends Apollo.Query<SiteNavigationAccessibleSitesQuery, SiteNavigationAccessibleSitesQueryVariables> {
    document = SiteNavigationAccessibleSitesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    siteNavigation: 'siteNavigation',
    siteNavigationAccessibleSites: 'siteNavigationAccessibleSites'
  },
  Fragment: {
    SiteSpareParts: 'SiteSpareParts',
    SiteSparePartsConfig: 'SiteSparePartsConfig',
    SiteVidi: 'SiteVidi',
    SiteVidiConfig: 'SiteVidiConfig',
    SiteDivertHealth: 'SiteDivertHealth',
    SiteDivertHealthConfig: 'SiteDivertHealthConfig'
  }
}