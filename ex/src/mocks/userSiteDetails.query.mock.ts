import { Segment, WorkOrderPromotionRule } from '@core/generated/types'
import { UserSiteDetailsQuery } from '@stores/site-details/graphql/user-site-by-id.graphql-gen.mock'

export const userSiteDetailsResponse: UserSiteDetailsQuery = {
  me: {
    relatedPortalData: {
      AccessibleSites: [
        {
          accountManagerContact: {
            alternativeContactTitle: 'Service Account Manager test',
            emailAddress: 'zeynel.aksoy@vanderlande.com',
            name: 'Zeynel  Aksoy',
            phoneNumber: null,
            show: true,
            userId: 'c0c597b6-39a8-4962-a565-2be1ea7d70eb',
            __typename: 'AccountManagerContact'
          },
          casesConfig: {
            divertHealthWorkOrderPromotionRule:
              WorkOrderPromotionRule.Automatic,
            enabled: true,
            monitronWorkOrderPromotionRule: WorkOrderPromotionRule.Automatic,
            shuttleHealthWorkOrderPromotionRule: WorkOrderPromotionRule.Manual,
            vidiWorkOrderPromotionRule: WorkOrderPromotionRule.Manual,
            __typename: 'CasesConfig'
          },
          contractManagerContact: {
            alternativeContactTitle: 'Service Contract Manager test',
            emailAddress: 'zeynel.aksoy@vanderlande.com',
            name: 'Zeynel  Aksoy',
            phoneNumber: null,
            userId: 'c0c597b6-39a8-4962-a565-2be1ea7d70eb',
            __typename: 'ContractManagerContact'
          },
          contractVisible: true,
          divertHealthConfig: {
            enabled: true,
            url: 'https://www.google.com',
            __typename: 'DivertHealthConfig'
          },
          id: '77a301b9-84a6-4d07-897b-722ce0ee4a67',
          itManagerContact: {
            alternativeContactTitle: 'Service Contract Manager IT',
            emailAddress: 'ceyhan.bozkurt@vanderlande.com',
            name: 'Ceyhan Bozkurt',
            phoneNumber: '',
            show: true,
            userId: '7b5afc17-9b2f-4e06-baaa-2f497ad61da8',
            __typename: 'ItManagerContact'
          },
          name: 'Istanbul new airport IST',
          processInsightsConfig: {
            enabled: true,
            __typename: 'ProcessInsightsConfig'
          },
          projects: [
            {
              id: '183429f5-6e04-4937-ab1f-0feb6e185c59',
              name: 'IST - PLC/SCADA Migration',
              projectNumber: 28234,
              segment: Segment.Airports,
              __typename: 'Project'
            },
            {
              id: '0a783760-0571-4d5a-bc8a-224cfcdeb193',
              name: 'IGA - BHS modifications',
              projectNumber: 15685,
              segment: Segment.Airports,
              __typename: 'Project'
            }
          ],
          published: false,
          serviceDeskContact: {
            alternativeContactTitle: '',
            emailAddress: 'TRGRP_Services_ICT_Shift@vanderlande.com',
            name: 'Istanbul (IST) - Service Desk',
            phoneNumber: '',
            phoneNumberOutsideWorkingHours: '',
            show: true,
            __typename: 'ServiceDeskContact'
          },
          shuttleHealthConfig: {
            enabled: true,
            url: 'https://www.google.com',
            __typename: 'ShuttleHealthConfig'
          },
          sourceId: '2315962',
          sparePartsContact: {
            alternativeContactTitle: 'spare parts test contact',
            emailAddress: 'wilson.pinto@vanderlande.com',
            show: true,
            __typename: 'SparePartsContact'
          },
          sparePartsShopConfig: {
            enabled: true,
            __typename: 'SparePartsShopConfig'
          },
          vidiConfig: {
            enabled: true,
            vidiAppName: '',
            __typename: 'VidiConfig'
          },
          visitingOfficeContact: {
            address:
              'Vanderlande Industries B.V.\nVanderlandelaan 2, 5466 RB  Veghel |The Netherlands\nT +31 413 49 49 49 | www.vanderlande.com\n',
            alternativeContactTitle: 'test irfan',
            email: 'syed.rizvi@vanderlande.com',
            name: '',
            phoneNumber: '',
            show: true,
            __typename: 'VisitingOfficeContact'
          },
          __typename: 'Site'
        }
      ],
      __typename: 'RelatedPortalData'
    },
    __typename: 'IdentityUser'
  }
}
