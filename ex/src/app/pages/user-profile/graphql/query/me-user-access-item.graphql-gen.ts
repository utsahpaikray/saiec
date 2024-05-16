import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { UserAccessItemPortalFragmentDoc } from './user-access-item.graphql-gen';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type MeUserAccessItemQueryVariables = Types.Exact<{
  portalId?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type MeUserAccessItemQuery = { __typename?: 'Query', me: { __typename?: 'IdentityUser', relatedPortalData?: { __typename?: 'RelatedPortalData', portals: Array<{ __typename?: 'Portal', name: string, id: any, sites: Array<{ __typename?: 'Site', id: any, name: string }> }> } | null } };

export const MeUserAccessItemDocument = gql`
    query meUserAccessItem($portalId: UUID) {
  me {
    relatedPortalData {
      portals(where: {id: {eq: $portalId}}) {
        ...UserAccessItemPortal
      }
    }
  }
}
    ${UserAccessItemPortalFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class MeUserAccessItemGQL extends Apollo.Query<MeUserAccessItemQuery, MeUserAccessItemQueryVariables> {
    document = MeUserAccessItemDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    meUserAccessItem: 'meUserAccessItem'
  }
}