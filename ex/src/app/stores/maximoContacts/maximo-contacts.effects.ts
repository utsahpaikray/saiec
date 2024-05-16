import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  SiteTicketInfoGQL,
  SiteTicketInfoQuery
} from '@pages/ticket-new/graphql/site-ticket-info.graphql-gen'
import { catchError, map, of, switchMap } from 'rxjs'
import { SiteContact } from './interfaces/state.interface'
import maximoContactActions from './maximo-contacts.actions'

const mapSiteContacts = (
  siteContacts: SiteTicketInfoQuery['ticketingSiteInfo']['contacts']
): SiteContact[] =>
  siteContacts.map((contact) => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone
  }))

export const getMaximoSiteContacts = createEffect(
  (actions$ = inject(Actions), siteTicketInfoGQL = inject(SiteTicketInfoGQL)) =>
    actions$.pipe(
      ofType(maximoContactActions.getSiteContacts),
      switchMap(({ siteId }) =>
        siteTicketInfoGQL.fetch({ siteId }).pipe(
          map((res) =>
            maximoContactActions.getSiteContactsSuccess({
              siteContacts: mapSiteContacts(res.data.ticketingSiteInfo.contacts)
            })
          ),
          catchError((error) =>
            of(maximoContactActions.getSiteContactsFailure({ error }))
          )
        )
      )
    ),
  { functional: true }
)
