import * as Types from '../../../core/generated/cms-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GenericTermsAndConditionsFragment = { __typename?: 'Generic', title?: string | null, contentSection?: { __typename?: 'GenericContentSection', json: any } | null };

export type TermsAndConditionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TermsAndConditionsQuery = { __typename?: 'Query', genericCollection?: { __typename?: 'GenericCollection', items: Array<{ __typename?: 'Generic', title?: string | null, contentSection?: { __typename?: 'GenericContentSection', json: any } | null } | null> } | null };

export const GenericTermsAndConditionsFragmentDoc = gql`
    fragment GenericTermsAndConditions on Generic {
  title
  contentSection {
    json
  }
}
    `;
export const TermsAndConditionsDocument = gql`
    query termsAndConditions {
  genericCollection(
    where: {slug: "my-vanderlande-terms-and-conditions"}
    limit: 1
  ) {
    items {
      ...GenericTermsAndConditions
    }
  }
}
    ${GenericTermsAndConditionsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class TermsAndConditionsGQL extends Apollo.Query<TermsAndConditionsQuery, TermsAndConditionsQueryVariables> {
    document = TermsAndConditionsDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    termsAndConditions: 'termsAndConditions'
  },
  Fragment: {
    GenericTermsAndConditions: 'GenericTermsAndConditions'
  }
}