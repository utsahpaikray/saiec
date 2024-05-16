import { Observable } from 'rxjs'
import { DocumentUploadInfoFragment } from './graphql/document-upload-info.graphql-gen'

export interface IAzureBlobStorageService {
  getUploadInfo(
    file: File,
    siteId: string,
    categoryCodeName: string,
    culture: string
  ): Observable<DocumentUploadInfoFragment>
  upload(
    documentUploadInfo: DocumentUploadInfoFragment,
    file: File,
    categoryName: string,
    siteId: string,
    categoryCodeName: string,
    culture: string
  ): Observable<DocumentUploadInfoFragment>
}
