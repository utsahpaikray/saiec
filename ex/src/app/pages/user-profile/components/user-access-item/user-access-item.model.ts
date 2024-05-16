import { Scalars } from '@core/generated/types'

export class UserAccessItem {
  constructor(
    public selectedPortalName: string,
    public selectedPortalId?: Scalars['UUID']
  ) {}
}
