import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./botton-sheet.component.scss']
})
export class BottomSheetComponent {
  /**
   * Title
   */
  @Input()
  title?: string

  /**
   * Is the component visible?
   */
  @Input()
  isOpen: boolean = false

  /**
   * Is the content expanded?
   */
  @Input()
  isExpanded: boolean = true

  /**
   * Close event handler
   */
  @Output()
  closeEvent = new EventEmitter<void>()

  public toggleExpended(): void {
    this.isExpanded = !this.isExpanded
  }
}
