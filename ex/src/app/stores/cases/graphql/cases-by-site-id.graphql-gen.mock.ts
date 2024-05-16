import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type CasesFragment = { __typename?: 'Case', id: any, status: Types.CaseStatus, type: string, title: string, source: Types.Source, dateTimeCreated: any, description?: string | null, statusUpdates: Array<{ __typename?: 'StatusUpdate', dateTimeCreated: any }>, workOrders: Array<{ __typename?: 'WorkOrder', orderNumber: string }>, messages: Array<{ __typename?: 'Message', dateTimeCreated: any }>, attachments: Array<{ __typename?: 'Attachment', dateTimeCreated: any }>, references: Array<{ __typename?: 'Reference', dateTimeCreated: any }> };

export type CasesBySiteIdQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  endCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type CasesBySiteIdQuery = { __typename?: 'Query', cases?: { __typename?: 'CasesConnection', nodes?: Array<{ __typename?: 'Case', id: any, status: Types.CaseStatus, type: string, title: string, source: Types.Source, dateTimeCreated: any, description?: string | null, statusUpdates: Array<{ __typename?: 'StatusUpdate', dateTimeCreated: any }>, workOrders: Array<{ __typename?: 'WorkOrder', orderNumber: string }>, messages: Array<{ __typename?: 'Message', dateTimeCreated: any }>, attachments: Array<{ __typename?: 'Attachment', dateTimeCreated: any }>, references: Array<{ __typename?: 'Reference', dateTimeCreated: any }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCasesBySiteIdQuery(
 *   ({ query, variables }) => {
 *     const { siteId, endCursor } = variables;
 *     return HttpResponse.json({
 *       data: { cases }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCasesBySiteIdQuery = (resolver: GraphQLResponseResolver<CasesBySiteIdQuery, CasesBySiteIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<CasesBySiteIdQuery, CasesBySiteIdQueryVariables>(
    'casesBySiteId',
    resolver,
    options
  )
