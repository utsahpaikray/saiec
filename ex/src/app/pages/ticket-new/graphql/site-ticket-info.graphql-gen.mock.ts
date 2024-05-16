import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SitePriorityFragment = { __typename?: 'SitePriority', description: string, value: string };

export type MaximoSiteContactFragment = { __typename?: 'MaximoSiteContact', id: string, name: string, email: string, phone: string };

export type SiteTicketInfoQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteTicketInfoQuery = { __typename?: 'Query', ticketingSiteInfo: { __typename?: 'TicketingSiteInfo', languageCode: string, priorities: Array<{ __typename?: 'SitePriority', description: string, value: string }>, contacts: Array<{ __typename?: 'MaximoSiteContact', id: string, name: string, email: string, phone: string }> } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteTicketInfoQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { ticketingSiteInfo }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteTicketInfoQuery = (resolver: GraphQLResponseResolver<SiteTicketInfoQuery, SiteTicketInfoQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteTicketInfoQuery, SiteTicketInfoQueryVariables>(
    'siteTicketInfo',
    resolver,
    options
  )
