import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Scalars } from '@core/generated/types'
import { DocumentDownloadService } from '@core/document-download/document-download.service'
import {
  DocumentationTableCategory,
  DocumentationTableDocumentDeleteEvent
} from '../documentation-table.model'

@Component({
  selector: 'app-documentation-table-category',
  templateUrl: './documentation-table-category.component.html',
  styleUrls: ['./documentation-table-category.component.scss']
})
export class DocumentationTableCategoryComponent {
  /**
   * Site id
   */
  @Input()
  siteId: Scalars['UUID']

  /**
   * Documentation Table Category
   */
  @Input()
  category: DocumentationTableCategory

  /**
   * File deleted handler
   */
  @Output()
  documentDelete = new EventEmitter<DocumentationTableDocumentDeleteEvent>()

  constructor(private documentDownloadService: DocumentDownloadService) {}

  public download(documentName: string): void {
    this.documentDownloadService.download(documentName, this.siteId)
  }

  /**
   * Delete document from document name
   * @param {number} index
   * @param {string} name
   */
  public deleteDocument(index: number, name: string): void {
    this.category.documents![index].isDeleting = true
    this.documentDelete.emit({ index, name })
  }

  /**
   * Toggle category's visibility
   * @param {boolean} event
   */
  onToggle(event: boolean): void {
    if (this.category.documentsAmount && this.category.documentsAmount > 0) {
      this.category.isOpen = event
    }
  }
}
