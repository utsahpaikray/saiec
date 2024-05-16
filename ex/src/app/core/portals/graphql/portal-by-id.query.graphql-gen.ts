import * as Types from '../../generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type PortalByIdQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type PortalByIdQuery = { __typename?: 'Query', portals: Array<{ __typename?: 'Portal', name: string, id: any }> };

export const PortalByIdDocument = gql`
    query portalById($id: UUID) {
  portals(where: {id: {eq: $id}}) {
    name
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PortalByIdGQL extends Apollo.Query<PortalByIdQuery, PortalByIdQueryVariables> {
    document = PortalByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    portalById: 'portalById'
  }
}