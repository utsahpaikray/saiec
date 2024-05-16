import { NgModule } from '@angular/core'
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import {
  APOLLO_FLAGS,
  APOLLO_NAMED_OPTIONS,
  APOLLO_OPTIONS
} from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'

import { HttpErrorResponse } from '@angular/common/http'
import { environment } from '@environments/environment'

const uri = environment.apiUrl // <-- add the URL of the GraphQL server here
const cmsUri = `https://graphql.contentful.com/content/v1/spaces/${environment.cms.spaceId}/environments/${environment.cms.environment}` // <-- add the URL of the CMS GraphQL server here

export function createApolloDefault(
  httpLink: HttpLink
): ApolloClientOptions<any> {
  const http = httpLink.create({ uri })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      })

    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(`[Network error]: ${networkError?.message}`)

      // redirect the page to home/login if user is not authorized or access token is expired
      const error = <HttpErrorResponse>networkError
      if (error.status === 500) {
        const networkErrorCode = error.error.errors[0].extensions.code

        if (networkErrorCode === 'AUTH_NOT_AUTHORIZED') {
          // eslint-disable-next-line no-console
          console.log('AUTH_NOT_AUTHORIZED')
        }
      }
    }
  })

  return {
    link: ApolloLink.from([errorLink, http]),
    cache: new InMemoryCache({
      typePolicies: {
        Ticket: {
          merge: true
        }
      }
    })
  }
}

export function createApolloCms(
  httpLink: HttpLink
): Record<string, ApolloClientOptions<any>> {
  // Set authentication header
  const authLink = setContext(() => {
    return {
      headers: {
        Authorization: `Bearer ${environment.cms.accessToken}`
      }
    }
  })

  const http = httpLink.create({ uri: cmsUri })

  return {
    cms: {
      name: 'cms',
      link: ApolloLink.from([authLink, http]),
      cache: new InMemoryCache({
        typePolicies: {
          TrainingLinkingCollections: {
            merge: true
          }
        }
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'ignore'
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    }
  }
}

@NgModule({
  providers: [
    {
      provide: APOLLO_FLAGS,
      useValue: {
        useMutationLoading: true
      }
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApolloDefault,
      deps: [HttpLink]
    },
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createApolloCms,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
