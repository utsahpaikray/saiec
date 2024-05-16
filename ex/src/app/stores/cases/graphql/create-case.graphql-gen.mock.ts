import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type CreateCaseMutationVariables = Types.Exact<{
  title: Types.Scalars['String'];
  description: Types.Scalars['String'];
  siteId: Types.Scalars['UUID'];
  assetSystemComponentId?: Types.InputMaybe<Types.Scalars['String']>;
  eventSource: Types.Source;
  createCaseContactPerson: Types.CreateCaseContactPersonInput;
  attachments: Array<Types.CreateCaseAttachmentInput> | Types.CreateCaseAttachmentInput;
}>;


export type CreateCaseMutation = { __typename?: 'Mutation', createCase: { __typename?: 'Case', id: any, dateTimeCreated: any, assetSystemComponentId?: string | null, title: string, description?: string | null, status: Types.CaseStatus, source: Types.Source, referenceId?: string | null, messages: Array<{ __typename?: 'Message', id: any, dateTimeCreated: any, content: string, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, attachments: Array<{ __typename?: 'Attachment', id: any, name: string, description: string, dateTimeCreated: any, contentType: string, ThumbnailUrlWithToken?: string | null, author: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } }>, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null, contactPerson?: { __typename?: 'ContactPerson', samAccountName: string, emailAddress: string, name: string } | null, statusUpdates: Array<{ __typename?: 'StatusUpdate', id: any, dateTimeCreated: any, status: Types.CaseStatus, author?: { __typename?: 'Author', userId: any, firstName: string, middleName?: string | null, lastName: string } | null }>, workOrders: Array<{ __typename?: 'WorkOrder', orderNumber: string }> } };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateCaseMutation(
 *   ({ query, variables }) => {
 *     const { title, description, siteId, assetSystemComponentId, eventSource, createCaseContactPerson, attachments } = variables;
 *     return HttpResponse.json({
 *       data: { createCase }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateCaseMutation = (resolver: GraphQLResponseResolver<CreateCaseMutation, CreateCaseMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<CreateCaseMutation, CreateCaseMutationVariables>(
    'createCase',
    resolver,
    options
  )
