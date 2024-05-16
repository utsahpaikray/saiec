import * as Types from '../../../core/generated/types';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type UpdateSiteConfigsMutationVariables = Types.Exact<{
  siteId: Types.Scalars['UUID'];
  monitronWorkOrderPromotionRule: Types.WorkOrderPromotionRule;
  divertHealthWorkOrderPromotionRule: Types.WorkOrderPromotionRule;
  shuttleHealthWorkOrderPromotionRule: Types.WorkOrderPromotionRule;
  vidiWorkOrderPromotionRule: Types.WorkOrderPromotionRule;
  casesEnabled: Types.Scalars['Boolean'];
  vidiEnabled: Types.Scalars['Boolean'];
  vidiAppName: Types.Scalars['String'];
  contractEnabled: Types.Scalars['Boolean'];
  divertHealthEnabled: Types.Scalars['Boolean'];
  divertHealthUrl: Types.Scalars['String'];
  shuttleHealthEnabled: Types.Scalars['Boolean'];
  shuttleHealthUrl: Types.Scalars['String'];
  SparePartsShopEnabled: Types.Scalars['Boolean'];
  ProcessInsightsEnabled: Types.Scalars['Boolean'];
}>;


export type UpdateSiteConfigsMutation = { __typename?: 'Mutation', editCasesConfig: boolean, editVidiConfig: boolean, editContractVisible: boolean, editDivertHealthConfig: boolean, editShuttleHealthConfig: boolean, editSparePartsShopConfig: boolean, editProcessInsightsConfig: boolean };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateSiteConfigsMutation(
 *   ({ query, variables }) => {
 *     const { siteId, monitronWorkOrderPromotionRule, divertHealthWorkOrderPromotionRule, shuttleHealthWorkOrderPromotionRule, vidiWorkOrderPromotionRule, casesEnabled, vidiEnabled, vidiAppName, contractEnabled, divertHealthEnabled, divertHealthUrl, shuttleHealthEnabled, shuttleHealthUrl, SparePartsShopEnabled, ProcessInsightsEnabled } = variables;
 *     return HttpResponse.json({
 *       data: { editCasesConfig, editVidiConfig, editContractVisible, editDivertHealthConfig, editShuttleHealthConfig, editSparePartsShopConfig, editProcessInsightsConfig }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateSiteConfigsMutation = (resolver: GraphQLResponseResolver<UpdateSiteConfigsMutation, UpdateSiteConfigsMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<UpdateSiteConfigsMutation, UpdateSiteConfigsMutationVariables>(
    'updateSiteConfigs',
    resolver,
    options
  )
