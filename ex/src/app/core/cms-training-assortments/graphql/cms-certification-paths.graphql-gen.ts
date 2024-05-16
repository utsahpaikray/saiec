import * as Types from '../../generated/cms-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type TrainingRequestCertificationPathItemFragment = { __typename?: 'CertificationPath', title?: string | null, sys: { __typename?: 'Sys', id: string } };

export type TrainingRequestCertificationPathCollectionFragment = { __typename?: 'CertificationPathCollection', items: Array<{ __typename?: 'CertificationPath', title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> };

export type CertificationPathsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CertificationPathsQuery = { __typename?: 'Query', certificationPathCollection?: { __typename?: 'CertificationPathCollection', items: Array<{ __typename?: 'CertificationPath', title?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };

export const TrainingRequestCertificationPathItemFragmentDoc = gql`
    fragment TrainingRequestCertificationPathItem on CertificationPath {
  sys {
    id
  }
  title
}
    `;
export const TrainingRequestCertificationPathCollectionFragmentDoc = gql`
    fragment TrainingRequestCertificationPathCollection on CertificationPathCollection {
  items {
    ...TrainingRequestCertificationPathItem
  }
}
    ${TrainingRequestCertificationPathItemFragmentDoc}`;
export const CertificationPathsDocument = gql`
    query certificationPaths {
  certificationPathCollection {
    ...TrainingRequestCertificationPathCollection
  }
}
    ${TrainingRequestCertificationPathCollectionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CertificationPathsGQL extends Apollo.Query<CertificationPathsQuery, CertificationPathsQueryVariables> {
    document = CertificationPathsDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    certificationPaths: 'certificationPaths'
  },
  Fragment: {
    TrainingRequestCertificationPathItem: 'TrainingRequestCertificationPathItem',
    TrainingRequestCertificationPathCollection: 'TrainingRequestCertificationPathCollection'
  }
}