import { Observable, of } from 'rxjs'
import { MaximoUserAccess } from '@core/generated/types'

export class MaximoAccessServiceMock {
  maximoUserAccess$: Observable<MaximoUserAccess> = of({
    canReadTickets: false,
    canWriteTickets: false
  })
}
