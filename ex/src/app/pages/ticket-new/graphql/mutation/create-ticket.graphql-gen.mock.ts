import * as Types from '../../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type CreateTicketMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  ticket: Types.TicketCreateInput;
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateTicketMutation(
 *   ({ query, variables }) => {
 *     const { siteId, ticket } = variables;
 *     return HttpResponse.json({
 *       data: { createTicket }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateTicketMutation = (resolver: GraphQLResponseResolver<CreateTicketMutation, CreateTicketMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateTicketMutation, CreateTicketMutationVariables>(
    'createTicket',
    resolver,
    options
  )
