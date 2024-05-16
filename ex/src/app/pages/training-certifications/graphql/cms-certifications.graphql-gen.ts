import * as Types from '../../../core/generated/cms-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type CertificationItemFragment = { __typename?: 'CertificationPath', title?: string | null, sys: { __typename?: 'Sys', id: string }, certificationInfo?: { __typename?: 'CertificationPathCertificationInfo', json: any } | null, certificationImageCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', title?: string | null, url?: string | null } | null> } | null };

export type CertificationImageFragment = { __typename?: 'Asset', title?: string | null, url?: string | null };

export type CertificationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CertificationsQuery = { __typename?: 'Query', certificationPathCollection?: { __typename?: 'CertificationPathCollection', items: Array<{ __typename?: 'CertificationPath', title?: string | null, sys: { __typename?: 'Sys', id: string }, certificationInfo?: { __typename?: 'CertificationPathCertificationInfo', json: any } | null, certificationImageCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', title?: string | null, url?: string | null } | null> } | null } | null> } | null };

export const CertificationImageFragmentDoc = gql`
    fragment CertificationImage on Asset {
  title
  url
}
    `;
export const CertificationItemFragmentDoc = gql`
    fragment CertificationItem on CertificationPath {
  sys {
    id
  }
  title
  certificationInfo {
    json
  }
  certificationImageCollection {
    items {
      ...CertificationImage
    }
  }
}
    ${CertificationImageFragmentDoc}`;
export const CertificationsDocument = gql`
    query certifications {
  certificationPathCollection {
    items {
      ...CertificationItem
    }
  }
}
    ${CertificationItemFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CertificationsGQL extends Apollo.Query<CertificationsQuery, CertificationsQueryVariables> {
    document = CertificationsDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    certifications: 'certifications'
  },
  Fragment: {
    CertificationItem: 'CertificationItem',
    CertificationImage: 'CertificationImage'
  }
}