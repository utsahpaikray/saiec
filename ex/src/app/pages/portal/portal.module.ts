import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

// Components
import { ComponentsModule } from '@components/components.module'
import { PortalRoutingModule } from './portal-routing.module'
import { PortalComponent } from './portal.component'

@NgModule({
  declarations: [PortalComponent],
  imports: [CommonModule, ComponentsModule, PortalRoutingModule]
})
export class PortalModule {}
