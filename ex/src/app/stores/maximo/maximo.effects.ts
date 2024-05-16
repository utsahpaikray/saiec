import { inject } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import siteDetailActions from '@stores/site-details/site-detail.actions'
import { catchError, map, of, switchMap } from 'rxjs'
import {
  SiteMaximoAccessGQL,
  SiteMaximoAccessQuery
} from './graphql/site-maximo-access.graphql-gen'
import { Maximo } from './interfaces/state.interface'
import maximoActions from './maximo.actions'

const mapMaximoAccess = (
  response: ApolloQueryResult<SiteMaximoAccessQuery>
): Maximo => {
  const { data } = response
  return {
    readAccess: data.maximoAccess.canReadTickets,
    writeAccess: data.maximoAccess.canWriteTickets
  }
}

export const selectedSiteChanged$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(siteDetailActions.getSiteDetailsSuccess),
      map(({ site }) => maximoActions.getMaximoAccess({ siteId: site.id }))
    ),
  { functional: true }
)

export const getMaximoAccess = createEffect(
  (
    actions$ = inject(Actions),
    siteMaximoAccessGQL = inject(SiteMaximoAccessGQL)
  ) =>
    actions$.pipe(
      ofType(maximoActions.getMaximoAccess),
      switchMap(({ siteId }) =>
        siteMaximoAccessGQL.fetch({ siteId }).pipe(
          map((response) => mapMaximoAccess(response)),
          map((maximoAccess) =>
            maximoActions.getMaximoAccessSuccess({ maximoAccess })
          ),
          catchError((error) =>
            of(maximoActions.getMaximoAccessFailure({ error }))
          )
        )
      )
    ),
  { functional: true }
)
