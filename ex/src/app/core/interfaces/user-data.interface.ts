import { CurrentUserFragment } from '../current-user/graphql/current-user.graphql-gen'
import { Roles } from './roles.enum'

export interface UserData {
  roles: Roles[]
  id: string
  me?: CurrentUserFragment
}
