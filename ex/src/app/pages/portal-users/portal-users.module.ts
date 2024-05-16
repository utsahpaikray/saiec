import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ComponentsModule } from '@components/components.module'
import { PortalUsersRoutingModule } from './portal-users-routing.module'
import { PortalUsersComponent } from './portal-users.component'
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'

@NgModule({
  declarations: [PortalUsersComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DefaultTemplateModule,
    PortalUsersRoutingModule
  ]
})
export class PortalUsersModule {}
