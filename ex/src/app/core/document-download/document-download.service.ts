import { Injectable } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core'
import { map } from 'rxjs'
import {
  DocumentUrlGQL,
  DocumentUrlQuery
} from '../../pages/documentation-category/graphql/document-url.graphql-gen'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class DocumentDownloadService {
  constructor(
    private documentUrlGQL: DocumentUrlGQL,
    private http: HttpClient
  ) {}

  /**
   * Download document
   * @param {string} documentName
   */
  public download(documentName: string, siteId: string): void {
    if (!documentName) {
      return
    }
    this.documentUrlGQL
      .fetch(
        {
          name: documentName,
          siteId: siteId
        },
        /*
         * The no-cache here is because if trying to download the same document again (and returning from cache)
         * it will return the same token (from cache) which is expired within 30 seconds so the download will fail.
         * The token always needs to be fetched (not from the cache)
         */
        { fetchPolicy: 'no-cache' }
      )
      .pipe(
        map(
          (result: ApolloQueryResult<DocumentUrlQuery>) =>
            result.data?.documentUrl || null
        )
      )
      .subscribe({
        next: this.downloadFile.bind(this)
      })
  }

  /**
   * Download file from url
   * @param {string} url
   */
  public downloadFile(url: string): void {
    const link = document.createElement('a')
    link.setAttribute('type', 'hidden')
    link.download = url
    link.href = url
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  /**
   * Download file from url
   * @param {string} url
   */
  public downloadFileWithToken(
    url: string,
    token: string,
    fileName: string
  ): void {
    this.http
      .get(url, {
        headers: {
          'Content-Type': 'application/octet-stream',
          apiKey: token
        },
        responseType: 'blob'
      })
      .subscribe((response) => {
        const anchor = document.createElement('a')
        anchor.style.display = 'none'
        anchor.href = URL.createObjectURL(response)
        anchor.download = fileName

        document.body.appendChild(anchor)
        anchor.click()
        // Clean up by removing the a element and revoking the object URL
        document.body.removeChild(anchor)
        URL.revokeObjectURL(anchor.href)
      })
  }
}
