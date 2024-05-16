import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type TicketFragment = { __typename?: 'Ticket', id: string, title?: string | null, sourceState?: string | null, priority?: string | null, issueType: Types.IssueType, customerPriority?: string | null, url?: string | null, state?: string | null, reportDate: any };

export type SiteTicketsQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  endCursor?: Types.InputMaybe<Types.Scalars['String']>;
  sourceState?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type SiteTicketsQuery = { __typename?: 'Query', tickets?: { __typename?: 'TicketsConnection', totalCount: number, nodes?: Array<{ __typename?: 'Ticket', id: string, title?: string | null, sourceState?: string | null, priority?: string | null, issueType: Types.IssueType, customerPriority?: string | null, url?: string | null, state?: string | null, reportDate: any }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteTicketsQuery(
 *   ({ query, variables }) => {
 *     const { siteId, endCursor, sourceState } = variables;
 *     return HttpResponse.json({
 *       data: { tickets }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteTicketsQuery = (resolver: GraphQLResponseResolver<SiteTicketsQuery, SiteTicketsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteTicketsQuery, SiteTicketsQueryVariables>(
    'siteTickets',
    resolver,
    options
  )
