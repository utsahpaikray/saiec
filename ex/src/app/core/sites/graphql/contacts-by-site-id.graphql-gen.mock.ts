import * as Types from '../../generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type ContractManagerContactFragment = { __typename?: 'ContractManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null };

export type ItManagerContactFragment = { __typename?: 'ItManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean };

export type AccountManagerContactFragment = { __typename?: 'AccountManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean };

export type ServiceDeskContactFragment = { __typename?: 'ServiceDeskContact', name?: string | null, phoneNumber?: string | null, emailAddress?: string | null, alternativeContactTitle?: string | null, phoneNumberOutsideWorkingHours?: string | null, show: boolean };

export type SparePartsContactFragment = { __typename?: 'SparePartsContact', emailAddress?: string | null, alternativeContactTitle?: string | null, show: boolean };

export type VisitingOfficeContactFragment = { __typename?: 'VisitingOfficeContact', name?: string | null, address?: string | null, email?: string | null, phoneNumber?: string | null, alternativeContactTitle?: string | null, show: boolean };

export type ContactsBySiteIdQueryVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
}>;


export type ContactsBySiteIdQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', accountManagerContact: { __typename?: 'AccountManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean }, contractManagerContact: { __typename?: 'ContractManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null }, itManagerContact: { __typename?: 'ItManagerContact', alternativeContactTitle?: string | null, emailAddress?: string | null, name?: string | null, phoneNumber?: string | null, show: boolean }, serviceDeskContact: { __typename?: 'ServiceDeskContact', name?: string | null, phoneNumber?: string | null, emailAddress?: string | null, alternativeContactTitle?: string | null, phoneNumberOutsideWorkingHours?: string | null, show: boolean }, sparePartsContact: { __typename?: 'SparePartsContact', emailAddress?: string | null, alternativeContactTitle?: string | null, show: boolean }, visitingOfficeContact: { __typename?: 'VisitingOfficeContact', name?: string | null, address?: string | null, email?: string | null, phoneNumber?: string | null, alternativeContactTitle?: string | null, show: boolean } }> };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockContactsBySiteIdQuery(
 *   ({ query, variables }) => {
 *     const { siteId } = variables;
 *     return HttpResponse.json({
 *       data: { sites }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockContactsBySiteIdQuery = (resolver: GraphQLResponseResolver<ContactsBySiteIdQuery, ContactsBySiteIdQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<ContactsBySiteIdQuery, ContactsBySiteIdQueryVariables>(
    'contactsBySiteId',
    resolver,
    options
  )
