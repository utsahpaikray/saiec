import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

// Components
import { ComponentsModule } from '@components/components.module'
import { UserAuthorizationComponent } from './user-authorization.component'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { RoleDisplayContentPipe } from '@core/pipes/role-display-content.pipe'

@NgModule({
  declarations: [UserAuthorizationComponent],
  exports: [UserAuthorizationComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    TranslocoRootModule,
    RoleDisplayContentPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [RoleDisplayContentPipe]
})
export class UserAuthorizationModule {}
