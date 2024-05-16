import * as Types from '../../generated/cms-types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GenericItemFragment = { __typename?: 'Generic', title?: string | null, cardDescription?: string | null, slug?: string | null };

export type GenericContentBySlugQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type GenericContentBySlugQuery = { __typename?: 'Query', genericCollection?: { __typename?: 'GenericCollection', items: Array<{ __typename?: 'Generic', title?: string | null, cardDescription?: string | null, slug?: string | null } | null> } | null };

export const GenericItemFragmentDoc = gql`
    fragment GenericItem on Generic {
  title
  cardDescription
  slug
}
    `;
export const GenericContentBySlugDocument = gql`
    query genericContentBySlug($slug: String!) {
  genericCollection(where: {slug_contains: $slug}) {
    items {
      ...GenericItem
    }
  }
}
    ${GenericItemFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GenericContentBySlugGQL extends Apollo.Query<GenericContentBySlugQuery, GenericContentBySlugQueryVariables> {
    document = GenericContentBySlugDocument;
    client = 'cms';
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    genericContentBySlug: 'genericContentBySlug'
  },
  Fragment: {
    GenericItem: 'GenericItem'
  }
}