import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UserAccessItemPortalFragment = { __typename?: 'Portal', name: string, id: any, sites: Array<{ __typename?: 'Site', id: any, name: string }> };

export type UserAccessItemQueryVariables = Types.Exact<{
  portalId?: Types.InputMaybe<Types.Scalars['UUID']>;
}>;


export type UserAccessItemQuery = { __typename?: 'Query', portals: Array<{ __typename?: 'Portal', name: string, id: any, sites: Array<{ __typename?: 'Site', id: any, name: string }> }> };

export const UserAccessItemPortalFragmentDoc = gql`
    fragment UserAccessItemPortal on Portal {
  name
  id
  sites {
    id
    name
  }
}
    `;
export const UserAccessItemDocument = gql`
    query userAccessItem($portalId: UUID) {
  portals(where: {id: {eq: $portalId}}) {
    ...UserAccessItemPortal
  }
}
    ${UserAccessItemPortalFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UserAccessItemGQL extends Apollo.Query<UserAccessItemQuery, UserAccessItemQueryVariables> {
    document = UserAccessItemDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    userAccessItem: 'userAccessItem'
  },
  Fragment: {
    UserAccessItemPortal: 'UserAccessItemPortal'
  }
}