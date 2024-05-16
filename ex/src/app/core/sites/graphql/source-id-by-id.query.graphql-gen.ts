import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SourceIdByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type SourceIdByIdQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', sourceId: string }> };

export const SourceIdByIdDocument = gql`
    query sourceIdById($id: UUID) {
  sites(where: {id: {eq: $id}}) {
    sourceId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SourceIdByIdGQL extends Apollo.Query<SourceIdByIdQuery, SourceIdByIdQueryVariables> {
    document = SourceIdByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    sourceIdById: 'sourceIdById'
  }
}