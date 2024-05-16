import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { applicationFeature } from '@stores/application/application.state'
import { Applications } from '@stores/application/interfaces/application.interface'
@Component({
  selector: 'app-site',
  templateUrl: './site.component.html'
})
export class SiteComponent {
  public store = inject(Store)
  public application$ = this.store.select(
    applicationFeature.selectCurrentApplication
  )
  public Applications = Applications
}
