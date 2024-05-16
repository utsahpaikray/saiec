import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type SiteTicketLanguageCodeQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type SiteTicketLanguageCodeQuery = { __typename?: 'Query', ticketingSiteInfo: { __typename?: 'TicketingSiteInfo', languageCode: string } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSiteTicketLanguageCodeQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { ticketingSiteInfo }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSiteTicketLanguageCodeQuery = (resolver: GraphQLResponseResolver<SiteTicketLanguageCodeQuery, SiteTicketLanguageCodeQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SiteTicketLanguageCodeQuery, SiteTicketLanguageCodeQueryVariables>(
    'siteTicketLanguageCode',
    resolver,
    options
  )
