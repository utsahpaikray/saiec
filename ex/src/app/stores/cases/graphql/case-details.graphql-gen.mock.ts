import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type CaseDetailsFragment = { __typename?: 'Case', id: any, dateTimeCreated: any, assetSystemComponentId?: string | null, title: string, description?: string | null, status: Types.CaseStatus, source: Types.Source, referenceId?: string | null, messages: Array<{ __typename?: 'Message', id: any, dateTimeCreated: any, content: string, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, attachments: Array<{ __typename?: 'Attachment', id: any, name: string, description: string, dateTimeCreated: any, contentType: string, ThumbnailUrlWithToken?: string | null, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null, contactPerson?: { __typename?: 'ContactPerson', samAccountName: string, emailAddress: string, name: string } | null, statusUpdates: Array<{ __typename?: 'StatusUpdate', id: any, dateTimeCreated: any, status: Types.CaseStatus, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null }>, workOrders: Array<{ __typename?: 'WorkOrder', orderNumber: string }> };

export type CaseDetailsQueryVariables = Types.Exact<{
  caseId: Types.Scalars['UUID'];
}>;


export type CaseDetailsQuery = { __typename?: 'Query', case?: { __typename?: 'Case', id: any, dateTimeCreated: any, assetSystemComponentId?: string | null, title: string, description?: string | null, status: Types.CaseStatus, source: Types.Source, referenceId?: string | null, messages: Array<{ __typename?: 'Message', id: any, dateTimeCreated: any, content: string, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, attachments: Array<{ __typename?: 'Attachment', id: any, name: string, description: string, dateTimeCreated: any, contentType: string, ThumbnailUrlWithToken?: string | null, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null, contactPerson?: { __typename?: 'ContactPerson', samAccountName: string, emailAddress: string, name: string } | null, statusUpdates: Array<{ __typename?: 'StatusUpdate', id: any, dateTimeCreated: any, status: Types.CaseStatus, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null }>, workOrders: Array<{ __typename?: 'WorkOrder', orderNumber: string }> } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCaseDetailsQuery(
 *   ({ query, variables }) => {
 *     const { caseId } = variables;
 *     return HttpResponse.json({
 *       data: { case }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCaseDetailsQuery = (resolver: GraphQLResponseResolver<CaseDetailsQuery, CaseDetailsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CaseDetailsQuery, CaseDetailsQueryVariables>(
    'caseDetails',
    resolver,
    options
  )
