import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type TicketWebLinksQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  webLinksFirst?: Types.InputMaybe<Types.Scalars['Int']>;
  webLinksCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TicketWebLinksQuery = { __typename?: 'Query', ticket?: { __typename?: 'Ticket', webLinks?: { __typename?: 'WebLinksConnection', totalCount: number, nodes?: Array<{ __typename?: 'WebLink', description: string, url: string, name?: string | null, key?: { __typename?: 'DocumentKey', number: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTicketWebLinksQuery(
 *   ({ query, variables }) => {
 *     const { id, webLinksFirst, webLinksCursor } = variables;
 *     return HttpResponse.json({
 *       data: { ticket }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockTicketWebLinksQuery = (resolver: GraphQLResponseResolver<TicketWebLinksQuery, TicketWebLinksQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<TicketWebLinksQuery, TicketWebLinksQueryVariables>(
    'ticketWebLinks',
    resolver,
    options
  )
