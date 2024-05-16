import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'

import { ComponentsModule } from '@components/components.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { UserAccessItemModule } from '../user-access-item/user-access-item.module'
import { UserAccessComponent } from './user-access.component'

@NgModule({
  declarations: [UserAccessComponent],
  exports: [UserAccessComponent],
  imports: [
    AngularSvgIconModule,
    CommonModule,
    ComponentsModule,
    UserAccessItemModule,
    TranslocoRootModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserAccessModule {}
