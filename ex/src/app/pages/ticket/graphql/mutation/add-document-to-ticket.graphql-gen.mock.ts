import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type AddDocumentToTicketMutationVariables = Types.Exact<{
  ticketId: Types.Scalars['String'];
  document: Types.DocumentInput;
}>;


export type AddDocumentToTicketMutation = { __typename?: 'Mutation', addDocumentToTicket: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockAddDocumentToTicketMutation(
 *   ({ query, variables }) => {
 *     const { ticketId, document } = variables;
 *     return HttpResponse.json({
 *       data: { addDocumentToTicket }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockAddDocumentToTicketMutation = (resolver: GraphQLResponseResolver<AddDocumentToTicketMutation, AddDocumentToTicketMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<AddDocumentToTicketMutation, AddDocumentToTicketMutationVariables>(
    'addDocumentToTicket',
    resolver,
    options
  )
