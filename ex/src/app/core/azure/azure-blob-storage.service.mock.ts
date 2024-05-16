import { Observable, of, Subject } from 'rxjs'
import { AzureBlobStorageFile } from './azure-blob-storage-file.interface'
import { IAzureBlobStorageService } from './azure-blob-storage.service.interface'
import { DocumentUploadInfoFragment } from './graphql/document-upload-info.graphql-gen'
import { AbortController } from '@azure/abort-controller'

export const mockDocumentUploadFileInfo: DocumentUploadInfoFragment = {
  blobName: 'test blobName',
  containerName: 'test containerName',
  fullBlobUri: 'test fullBlobUri',
  sasToken: 'test sasToken',
  serviceUrl: 'test serviceUrl'
}

const mockPdfFileUploaded: AzureBlobStorageFile = {
  id: '762885d0-518d-4774-90f3-3cfcd4bdfdf0',
  name: 'uploaded-file.pdf',
  category: 'Certifications',
  size: 132640,
  progress: 100,
  uploaded: true,
  canceled: false,
  processed: true,
  abortController: new AbortController()
}

const mockZipFileUploading: AzureBlobStorageFile = {
  id: '01b6b4d9-6f9f-4161-9bf2-2af3d4eb6574',
  name: 'uploading-file.zip',
  category: 'O&M manual',
  size: 975703087,
  progress: 10,
  uploaded: false,
  canceled: false,
  processed: false,
  abortController: new AbortController()
}

const mockZipFileProcessing: AzureBlobStorageFile = {
  id: '1f2127a8-4047-4f0b-9df9-8659a2f146ea',
  name: 'processing-file.zip',
  category: 'O&M manual',
  size: 975703087,
  progress: 100,
  uploaded: true,
  canceled: false,
  processed: false,
  abortController: new AbortController()
}

const mockZipFileCanceled = {
  id: '762885d0-518d-4774-90f3-3cfcd4bdfdf0',
  name: 'canceled-file.zip',
  category: 'O&M manual',
  size: 975703087,
  progress: 100,
  uploaded: false,
  canceled: true,
  processed: false,
  abortController: new AbortController()
}

export class AzureBlobStorageServiceMock implements IAzureBlobStorageService {
  private files = [
    mockPdfFileUploaded,
    mockZipFileUploading,
    mockZipFileProcessing,
    mockZipFileCanceled
  ]
  readonly files$ = of(this.files)
  public uploadEnd$: Observable<void> = new Subject<void>().asObservable()

  public getUploadInfo(
    file: File,
    siteId: string
  ): Observable<DocumentUploadInfoFragment> {
    return of(mockDocumentUploadFileInfo)
  }

  public upload(
    documentUploadInfo: DocumentUploadInfoFragment,
    file: File
  ): Observable<DocumentUploadInfoFragment> {
    return of(mockDocumentUploadFileInfo)
  }

  private getFile(id: string) {
    return this.files.find((file) => file.id === id) as AzureBlobStorageFile
  }

  public cancelFile(fileId: string) {
    const file = this.getFile(fileId)

    file.progress = 100
    file.canceled = true
  }
}
