import { CommonModule } from '@angular/common'
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { DocumentDownloadService } from '@core/document-download/document-download.service'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { File, WebLink } from '@core/generated/types'
import { map, Observable, Subject } from 'rxjs'
import {
  MaximoUserApiKeyGQL,
  MaximoUserApiKeyQuery
} from '../graphql/maximo-user-api-key.graphql-gen'

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule],
  providers: [DocumentDownloadService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentListComponent implements OnDestroy {
  /**
   * Documents to show in the list
   */
  @Input() documents: Array<File | WebLink>

  /**
   * Check loading more state to toggle show more button
   */
  @Input() isLoadingMore: boolean

  /**
   * Check has more documents state to toggle show more button
   */
  @Input() hasMoreDocuments: boolean

  /**
   * Show more button click event
   */
  @Output()
  showMoreEvent = new EventEmitter<Event>()

  private unsubscribe$: Subject<void> = new Subject<void>()

  constructor(
    private documentDownloadService: DocumentDownloadService,
    private maximoUserApiKeyGQL: MaximoUserApiKeyGQL
  ) {}

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * Download file or open web links when click on a document
   * @param {File | WebLink} document
   */
  public onDocumentClick(document: File | WebLink): void {
    if (document.__typename == 'File') {
      this.download(document.url, document.key?.number as string)
    } else {
      window.open(document.url, '_blank')
    }
  }

  /**
   * Get maximo user api key
   * @returns {Observable<string>}
   */
  private getMaximoUserApiKey(): Observable<string> {
    return this.maximoUserApiKeyGQL.fetch().pipe(
      map((result: ApolloQueryResult<MaximoUserApiKeyQuery>) => {
        return result.data?.maximoUserApiKey
      })
    )
  }

  /**
   * Download document
   * @param {string} documentUrl
   * @param {string} fileName
   */
  public download(documentUrl: string, fileName: string): void {
    if (!documentUrl) return

    this.getMaximoUserApiKey().subscribe({
      next: (maximoUserApiKey: string) => {
        this.documentDownloadService.downloadFileWithToken(
          documentUrl,
          maximoUserApiKey,
          fileName
        )
      },
      error: () => {}
    })
  }
}
