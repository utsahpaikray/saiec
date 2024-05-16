import { Component, Input } from '@angular/core'
import { Portal } from '@stores/portals/interfaces/portal.interface'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-portals-list',
  templateUrl: './portals-list.component.html'
})
export class PortalsListComponent {
  @Input() portals$: Observable<Portal[]>
  @Input() noDataText?: string
  @Input() loading$: Observable<boolean>
}
