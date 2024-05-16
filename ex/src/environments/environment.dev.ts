import { Environment } from './environment.interface'

export const environment: Environment = {
  production: false,
  appUrl: 'http://localhost:5000',
  apiUrl: 'http://localhost:5001/graphql',
  authorityUrl: 'https://keycloak-dev.evimvi.nl/auth/realms/dsf',
  sparePartsUrl: `https://spareparts.tst.vanderlande.com/INTERSHOP/web/WFS/VI-Default-Site/en_US/-/EUR/ViewUserAccount-ShowLogin`,
  newsLinkUrl: 'https://www.vanderlande.com/',
  cms: {
    apiUrl: 'https://graphql.contentful.com',
    spaceId: 'edffyomf8p2r',
    accessToken: '2mq17XF8Eq-qQbe_WpzipQlFBn8AWSjYpdKGjgjXkIs',
    environment: 'master'
  },
  privacyPolicyUrl: 'https://www.vanderlande.com/privacy-statement',
  cookiePolicyUrl: 'https://www.vanderlande.com/cookie-policy/',
  viewAllTicketsUrl:
    'https://dos.tst.vanderlande.com/maximo/ui/?event=loadapp&value=viviewsr',
  createTicketUrl:
    'https://dos.tst.vanderlande.com/maximo/ui/?event=loadapp&value=vicreatesr',
  maximoSatisfactionSurveyUrl:
    'https://dos.acc.vanderlande.com/maximo/webclient/survey/jspsurvey.jsp?userId=nltvdp&lan=EN',
  processInsights: {
    moduleUrl: 'http://localhost:4200',
    apis: ['http://localhost:5000/api', 'http://localhost:8088/api']
  },
  vodApi: {
    basePath: 'https://azfun-dsf-opdata-ontology-dev-001.azurewebsites.net/api'
  },
  vidiUrl: 'https://analytics.vanderlande.com/en-US/app/launcher/home',
  microFrontends: {
    siteOverview: {
      type: 'module',
      remoteEntry:
        'https://dsfgenericfectodev003.z6.web.core.windows.net/remoteEntry.js',
      exposedModule: './Component'
    },
    anomalies: {
      type: 'component',
      remoteEntry:
        'https://dsfgenericfectodev004.z6.web.core.windows.net/remoteEntry.js',
      exposedModule: './Component',
      componentName: 'HeatmapComponent'
    }
  }
}
