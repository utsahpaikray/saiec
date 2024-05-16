import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentUrlQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentUrlQuery = { __typename?: 'Query', documentUrl: any };

export const DocumentUrlDocument = gql`
    query documentUrl($name: String!, $siteId: UUID!) {
  documentUrl(name: $name, siteId: $siteId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentUrlGQL extends Apollo.Query<DocumentUrlQuery, DocumentUrlQueryVariables> {
    document = DocumentUrlDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    documentUrl: 'documentUrl'
  }
}