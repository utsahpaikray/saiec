import { Component, Input } from '@angular/core'
import { Scalars } from '@core/generated/types'
import { DocumentTableItem } from '../document-table/document-table-item.interface'

@Component({
  selector: 'app-document-table-folder',
  templateUrl: './document-table-folder.component.html',
  styleUrls: ['./document-table-folder.component.scss']
})
export class DocumentTableFolderComponent {
  /**
   * Document Table Item
   */
  @Input()
  document: DocumentTableItem

  /**
   * Site id
   */
  @Input()
  siteId: Scalars['UUID']

  /**
   * Is parent folder open?
   */
  @Input()
  isParentOpen = false

  @Input()
  selectedCulture?: string

  /**
   * Is folder open?
   */
  isOpen = false

  /**
   * Identation space for the table items in rems
   */
  public identationLeft = 0.75

  constructor() {}

  /**
   * Toggle folder's visibility
   * @param {boolean} Event
   */
  onToggle(event: boolean) {
    this.isOpen = event
  }
}
