import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

// Components
import { ComponentsModule } from '@components/components.module'
import { PortalsStoreModule } from '@stores/portals/portals.module'
import { PortalsRoutingModule } from './portals-routing.module'
import { PortalsComponent } from './portals.component'

@NgModule({
  declarations: [PortalsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    PortalsRoutingModule,
    PortalsStoreModule
  ]
})
export class PortalsModule {}
