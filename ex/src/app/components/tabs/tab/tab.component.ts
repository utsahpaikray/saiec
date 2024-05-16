import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent {
  /**
   * Tab label text
   */
  @Input()
  label?: string = ''

  /**
   * Is Tab disabled
   */
  @Input()
  isDisabled?: boolean = false

  /**
   * Used by parent tab group to show or hide tab content
   */
  public isActive = false
}
