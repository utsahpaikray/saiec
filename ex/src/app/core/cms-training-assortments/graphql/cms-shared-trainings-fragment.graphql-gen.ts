import * as Types from '../../generated/cms-types';

import { gql } from 'apollo-angular';
export type AssortmentItemFragment = { __typename?: 'Assortment', title?: string | null, segment?: Array<string | null> | null, sys: { __typename?: 'Sys', id: string } };

export type CertificationPathItemFragment = { __typename?: 'CertificationPath', title?: string | null, description?: string | null, sys: { __typename?: 'Sys', id: string } };

export type TrainingImageFragment = { __typename?: 'Asset', title?: string | null, url?: string | null };

export const AssortmentItemFragmentDoc = gql`
    fragment AssortmentItem on Assortment {
  title
  sys {
    id
  }
  segment
}
    `;
export const CertificationPathItemFragmentDoc = gql`
    fragment CertificationPathItem on CertificationPath {
  title
  description
  sys {
    id
  }
}
    `;
export const TrainingImageFragmentDoc = gql`
    fragment TrainingImage on Asset {
  title
  url
}
    `;
export const namedOperations = {
  Fragment: {
    AssortmentItem: 'AssortmentItem',
    CertificationPathItem: 'CertificationPathItem',
    TrainingImage: 'TrainingImage'
  }
}