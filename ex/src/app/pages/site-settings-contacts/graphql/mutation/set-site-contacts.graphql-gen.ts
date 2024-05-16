import * as Types from '../../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SetSiteContactsMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  siteContacts: Types.SiteContactsMutationDtoInput;
}>;


export type SetSiteContactsMutation = { __typename?: 'Mutation', editSiteContacts: boolean };

export const SetSiteContactsDocument = gql`
    mutation setSiteContacts($siteId: UUID!, $siteContacts: SiteContactsMutationDtoInput!) {
  editSiteContacts(siteId: $siteId, siteContacts: $siteContacts)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetSiteContactsGQL extends Apollo.Mutation<SetSiteContactsMutation, SetSiteContactsMutationVariables> {
    document = SetSiteContactsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Mutation: {
    setSiteContacts: 'setSiteContacts'
  }
}