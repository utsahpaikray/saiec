import { Roles } from '@core/interfaces/roles.enum'
import { RoleDisplayContent } from '@pages/user-profile/components/user-authorization/role-display-content.interface'
import { UserRoleFragment } from '@pages/user-profile/graphql/query/user-authorization.graphql-gen'
import { RoleDisplayContentPipe } from './role-display-content.pipe'

describe('RoleDisplayContentPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new RoleDisplayContentPipe()
  const mockRoleDisplayContents: RoleDisplayContent[] = [
    {
      id: Roles.SuperUser,
      label: 'Vanderlande Superuser',
      isDisabled: false
    },
    {
      id: Roles.PortalAdmin,
      label: 'Vanderlande Portal Admin',
      isDisabled: false
    },
    {
      id: Roles.VanderlandeUser,
      label: 'Vanderlande User',
      isDisabled: false
    },
    {
      id: Roles.User,
      label: 'Customer User',
      isDisabled: false
    }
  ]

  it('returns matching single role display content', () => {
    const mockRole: UserRoleFragment = {
      id: '9d5e7170-3354-4d98-9772-417c9acd6804',
      name: 'SuperUser'
    }

    expect(pipe.transform(mockRole, mockRoleDisplayContents)).toBe(
      mockRoleDisplayContents[0]
    )
  })

  it('returns undefined if no matching single role display content', () => {
    const mockRole: UserRoleFragment = {
      id: '9d5e7170-3354-4d98-9772-417c9acd6804',
      name: 'NonExistentUser'
    }

    expect(pipe.transform(mockRole, mockRoleDisplayContents)).toBe(undefined)
  })
})
