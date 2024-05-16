import { Applications } from '@stores/application/interfaces/application.interface'

export interface CMSEnvironment {
  apiUrl: string
  spaceId: string
  accessToken: string
  environment: string
}

export interface PiaEnvironment {
  moduleUrl: string
  apis: string[]
}

export interface VodApiEnvironment {
  basePath: string
}

export type ApplicationsEnvironment = {
  [key in Applications]?: {
    disabled: boolean
  }
}

export interface Environment {
  production: boolean
  mocks?: boolean
  appUrl: string
  apiUrl: string
  authorityUrl: string
  sparePartsUrl: string
  newsLinkUrl: string
  cms: CMSEnvironment
  privacyPolicyUrl: string
  cookiePolicyUrl: string
  viewAllTicketsUrl: string
  createTicketUrl: string
  maximoSatisfactionSurveyUrl: string
  processInsights: PiaEnvironment
  vodApi: VodApiEnvironment
  vidiUrl: string
  applications?: ApplicationsEnvironment
  microFrontends: {
    siteOverview: {
      type: 'module'
      remoteEntry: string
      exposedModule: string
    }
    anomalies: {
      type: 'component'
      remoteEntry: string
      exposedModule: string
      componentName: string
    }
  }
}
