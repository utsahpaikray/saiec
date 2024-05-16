import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true
})
export class PageHeaderComponent {
  @HostBinding('class') class = 'd-grid gap-y-l column-grid'
}
