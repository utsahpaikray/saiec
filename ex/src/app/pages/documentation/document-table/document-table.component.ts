import { Component, Input } from '@angular/core'
import { Scalars } from '@core/generated/types'
import { DocumentTableItem } from '@pages/documentation/document-table/document-table-item.interface'

@Component({
  selector: 'app-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss']
})
export class DocumentTableComponent {
  @Input()
  documents: DocumentTableItem[] | null

  @Input()
  loading: boolean

  @Input()
  selectedCulture?: string

  @Input()
  siteId: Scalars['UUID']
}
