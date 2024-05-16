import * as Types from '../../../core/generated/cms-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ServicePackageFragment = { __typename?: 'ServicePackage', title?: string | null, slug?: string | null, codes?: Array<string | null> | null, buildingBlock?: { __typename?: 'ServiceBuildingBlock', title?: string | null, serviceSolution?: { __typename?: 'ServiceSolution', serviceType?: { __typename?: 'ServiceType', title?: string | null } | null } | null } | null };

export type ServiceBuildingBlockFragment = { __typename?: 'ServiceBuildingBlock', title?: string | null, serviceSolution?: { __typename?: 'ServiceSolution', serviceType?: { __typename?: 'ServiceType', title?: string | null } | null } | null };

export type ServiceSolutionFragment = { __typename?: 'ServiceSolution', serviceType?: { __typename?: 'ServiceType', title?: string | null } | null };

export type ServiceTypeFragment = { __typename?: 'ServiceType', title?: string | null };

export type ServicePackageQueryVariables = Types.Exact<{
  packageCodes?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
}>;


export type ServicePackageQuery = { __typename?: 'Query', servicePackageCollection?: { __typename?: 'ServicePackageCollection', items: Array<{ __typename?: 'ServicePackage', title?: string | null, slug?: string | null, codes?: Array<string | null> | null, buildingBlock?: { __typename?: 'ServiceBuildingBlock', title?: string | null, serviceSolution?: { __typename?: 'ServiceSolution', serviceType?: { __typename?: 'ServiceType', title?: string | null } | null } | null } | null } | null> } | null };

export const ServiceTypeFragmentDoc = gql`
    fragment ServiceType on ServiceType {
  title
}
    `;
export const ServiceSolutionFragmentDoc = gql`
    fragment ServiceSolution on ServiceSolution {
  serviceType {
    ...ServiceType
  }
}
    ${ServiceTypeFragmentDoc}`;
export const ServiceBuildingBlockFragmentDoc = gql`
    fragment ServiceBuildingBlock on ServiceBuildingBlock {
  title
  serviceSolution {
    ...ServiceSolution
  }
}
    ${ServiceSolutionFragmentDoc}`;
export const ServicePackageFragmentDoc = gql`
    fragment ServicePackage on ServicePackage {
  title
  slug
  codes
  buildingBlock {
    ...ServiceBuildingBlock
  }
}
    ${ServiceBuildingBlockFragmentDoc}`;
export const ServicePackageDocument = gql`
    query servicePackage($packageCodes: [String]) {
  servicePackageCollection(where: {codes_contains_some: $packageCodes}) {
    items {
      ...ServicePackage
    }
  }
}
    ${ServicePackageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ServicePackageGQL extends Apollo.Query<ServicePackageQuery, ServicePackageQueryVariables> {
    document = ServicePackageDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    servicePackage: 'servicePackage'
  },
  Fragment: {
    ServicePackage: 'ServicePackage',
    ServiceBuildingBlock: 'ServiceBuildingBlock',
    ServiceSolution: 'ServiceSolution',
    ServiceType: 'ServiceType'
  }
}