import * as Types from '../../generated/cms-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type TrainingCertificationPathItemFragment = { __typename?: 'CertificationPath', title?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, trainingsCollection?: { __typename?: 'CertificationPathTrainingsCollection', items: Array<{ __typename?: 'Training', title?: string | null, targetGroup?: string | null, duration?: string | null, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'TrainingLinkingCollections', assortmentCollection?: { __typename?: 'AssortmentCollection', items: Array<{ __typename?: 'Assortment', title?: string | null, segment?: Array<string | null> | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null };

export type TrainingItemWithLinkedAssortmentFragment = { __typename?: 'Training', title?: string | null, targetGroup?: string | null, duration?: string | null, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'TrainingLinkingCollections', assortmentCollection?: { __typename?: 'AssortmentCollection', items: Array<{ __typename?: 'Assortment', title?: string | null, segment?: Array<string | null> | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null };

export type LinkedAssortmentItemFragment = { __typename?: 'Assortment', title?: string | null, segment?: Array<string | null> | null, sys: { __typename?: 'Sys', id: string } };

export type CertificationPathByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type CertificationPathByIdQuery = { __typename?: 'Query', certificationPath?: { __typename?: 'CertificationPath', title?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string }, trainingsCollection?: { __typename?: 'CertificationPathTrainingsCollection', items: Array<{ __typename?: 'Training', title?: string | null, targetGroup?: string | null, duration?: string | null, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'TrainingLinkingCollections', assortmentCollection?: { __typename?: 'AssortmentCollection', items: Array<{ __typename?: 'Assortment', title?: string | null, segment?: Array<string | null> | null, sys: { __typename?: 'Sys', id: string } } | null> } | null } | null } | null> } | null } | null };

export const LinkedAssortmentItemFragmentDoc = gql`
    fragment LinkedAssortmentItem on Assortment {
  title
  sys {
    id
  }
  segment
}
    `;
export const TrainingItemWithLinkedAssortmentFragmentDoc = gql`
    fragment TrainingItemWithLinkedAssortment on Training {
  title
  targetGroup
  duration
  sys {
    id
  }
  linkedFrom {
    assortmentCollection {
      items {
        ...LinkedAssortmentItem
      }
    }
  }
}
    ${LinkedAssortmentItemFragmentDoc}`;
export const TrainingCertificationPathItemFragmentDoc = gql`
    fragment TrainingCertificationPathItem on CertificationPath {
  sys {
    id
  }
  title
  description
  trainingsCollection {
    items {
      ...TrainingItemWithLinkedAssortment
    }
  }
}
    ${TrainingItemWithLinkedAssortmentFragmentDoc}`;
export const CertificationPathByIdDocument = gql`
    query certificationPathById($id: String!) {
  certificationPath(id: $id) {
    ...TrainingCertificationPathItem
  }
}
    ${TrainingCertificationPathItemFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CertificationPathByIdGQL extends Apollo.Query<CertificationPathByIdQuery, CertificationPathByIdQueryVariables> {
    document = CertificationPathByIdDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    certificationPathById: 'certificationPathById'
  },
  Fragment: {
    TrainingCertificationPathItem: 'TrainingCertificationPathItem',
    TrainingItemWithLinkedAssortment: 'TrainingItemWithLinkedAssortment',
    LinkedAssortmentItem: 'LinkedAssortmentItem'
  }
}