import { Component, Input } from '@angular/core'
import { DocumentTableItem } from '../document-table/document-table-item.interface'
import { DocumentDownloadService } from '@core/document-download/document-download.service'
import { Scalars } from '@core/generated/types'

@Component({
  selector: 'app-document-table-file',
  templateUrl: './document-table-file.component.html',
  styleUrls: ['./document-table-file.component.scss']
})
export class DocumentTableFileComponent {
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
   * Identation space for the table items in rems
   */
  public identationLeft = 0.75

  /**
   * Identation space for the table items
   */
  public identationWithIcons = 1.5 * 2 + 0.25 + this.identationLeft * 2

  /**
   * InnerHtml string to be highlighted
   */
  public highlightText: string

  constructor(private documentDownloadService: DocumentDownloadService) {}

  /**
   * Download document
   */
  public download(): void {
    if (this.document.fullName) {
      this.documentDownloadService.download(this.document.fullName, this.siteId)
    }
  }
}
