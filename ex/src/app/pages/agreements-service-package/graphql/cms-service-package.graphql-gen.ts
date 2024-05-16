import * as Types from '../../../core/generated/cms-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ServicePackageTitleAndCodesFragment = { __typename?: 'ServicePackage', title?: string | null, codes?: Array<string | null> | null };

export type ServicePackageBySlugQueryVariables = Types.Exact<{
  slug?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type ServicePackageBySlugQuery = { __typename?: 'Query', servicePackageCollection?: { __typename?: 'ServicePackageCollection', items: Array<{ __typename?: 'ServicePackage', title?: string | null, codes?: Array<string | null> | null } | null> } | null };

export const ServicePackageTitleAndCodesFragmentDoc = gql`
    fragment ServicePackageTitleAndCodes on ServicePackage {
  title
  codes
}
    `;
export const ServicePackageBySlugDocument = gql`
    query servicePackageBySlug($slug: String) {
  servicePackageCollection(where: {slug: $slug}) {
    items {
      ...ServicePackageTitleAndCodes
    }
  }
}
    ${ServicePackageTitleAndCodesFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ServicePackageBySlugGQL extends Apollo.Query<ServicePackageBySlugQuery, ServicePackageBySlugQueryVariables> {
    document = ServicePackageBySlugDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    servicePackageBySlug: 'servicePackageBySlug'
  },
  Fragment: {
    ServicePackageTitleAndCodes: 'ServicePackageTitleAndCodes'
  }
}