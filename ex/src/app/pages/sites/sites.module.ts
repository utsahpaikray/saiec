import { NgModule } from '@angular/core'

// Components
import { SitesRoutingModule } from './sites-routing.module'
import { SitesComponent } from './sites.component'

@NgModule({
  declarations: [SitesComponent],
  imports: [SitesRoutingModule]
})
export class SitesModule {}
