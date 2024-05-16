import { Pipe, PipeTransform } from '@angular/core'
import { RoleDisplayContent } from '@pages/user-profile/components/user-authorization/role-display-content.interface'
import { UserRoleFragment } from '@pages/user-profile/graphql/query/user-authorization.graphql-gen'

@Pipe({
  name: 'roleDisplayContent',
  standalone: true
})
export class RoleDisplayContentPipe implements PipeTransform {
  transform(
    role: UserRoleFragment,
    roleDisplayContents: RoleDisplayContent[]
  ): RoleDisplayContent | undefined {
    return roleDisplayContents.find(
      (roleDisplayContent) => roleDisplayContent.id === role?.name
    )
  }
}
