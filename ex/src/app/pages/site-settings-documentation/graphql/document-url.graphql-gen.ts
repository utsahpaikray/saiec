import * as Types from '../../../core/generated/types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type DocumentationSettingsDocumentUrlQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
}>;


export type DocumentationSettingsDocumentUrlQuery = { __typename?: 'Query', documentUrl: any };

export const DocumentationSettingsDocumentUrlDocument = gql`
    query documentationSettingsDocumentUrl($name: String!, $siteId: UUID!) {
  documentUrl(name: $name, siteId: $siteId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DocumentationSettingsDocumentUrlGQL extends Apollo.Query<DocumentationSettingsDocumentUrlQuery, DocumentationSettingsDocumentUrlQueryVariables> {
    document = DocumentationSettingsDocumentUrlDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const namedOperations = {
  Query: {
    documentationSettingsDocumentUrl: 'documentationSettingsDocumentUrl'
  }
}