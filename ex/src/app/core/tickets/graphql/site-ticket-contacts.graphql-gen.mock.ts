import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteTicketContactsQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteTicketContactsQuery = { __typename?: 'Query', ticketingSiteInfo: { __typename?: 'TicketingSiteInfo', contacts: Array<{ __typename?: 'MaximoSiteContact', id: string, name: string, email: string, phone: string }> } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteTicketContactsQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { ticketingSiteInfo }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteTicketContactsQuery = (resolver: GraphQLResponseResolver<SiteTicketContactsQuery, SiteTicketContactsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteTicketContactsQuery, SiteTicketContactsQueryVariables>(
    'siteTicketContacts',
    resolver,
    options
  )
