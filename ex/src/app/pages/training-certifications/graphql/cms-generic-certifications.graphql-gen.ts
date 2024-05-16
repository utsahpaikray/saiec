import * as Types from '../../../core/generated/cms-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GenericCertificationsFragment = { __typename?: 'Generic', title?: string | null, slug?: string | null, description?: string | null };

export type GenericCertificationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GenericCertificationsQuery = { __typename?: 'Query', genericCollection?: { __typename?: 'GenericCollection', items: Array<{ __typename?: 'Generic', title?: string | null, slug?: string | null, description?: string | null } | null> } | null };

export const GenericCertificationsFragmentDoc = gql`
    fragment GenericCertifications on Generic {
  title
  slug
  description
}
    `;
export const GenericCertificationsDocument = gql`
    query genericCertifications {
  genericCollection(where: {slug: "certifications"}) {
    items {
      ...GenericCertifications
    }
  }
}
    ${GenericCertificationsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GenericCertificationsGQL extends Apollo.Query<GenericCertificationsQuery, GenericCertificationsQueryVariables> {
    document = GenericCertificationsDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    genericCertifications: 'genericCertifications'
  },
  Fragment: {
    GenericCertifications: 'GenericCertifications'
  }
}