import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'

import { IdentityUser } from '../generated/types'
import { AllUsersGQL } from './graphql/users.query.graphql-gen'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private allUsersGQL: AllUsersGQL) {}

  getUsers(searchText: string = '') {
    const collator = new Intl.Collator()
    return this.allUsersGQL.fetch({ searchText }).pipe(
      map((result) =>
        [...(<IdentityUser[]>result.data?.users)].sort((a, b) => {
          return collator.compare(
            (a.customerEmail || a.email) as string,
            (b.customerEmail || b.email) as string
          )
        })
      )
    )
  }
}
