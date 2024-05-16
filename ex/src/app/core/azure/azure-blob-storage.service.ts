import { BlockBlobClient, newPipeline } from '@azure/storage-blob'
import { AbortController } from '@azure/abort-controller'
import {
  catchError,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  throwError
} from 'rxjs'
import { Injectable } from '@angular/core'
import { TransferProgressEvent } from '@azure/core-http'
import { v4 as uuidv4 } from 'uuid'

import {
  DocumentUploadInfoFragment,
  DocumentUploadInfoGQL
} from './graphql/document-upload-info.graphql-gen'
import { IAzureBlobStorageService } from './azure-blob-storage.service.interface'
import { AzureBlobStorageFile } from '@core/azure/azure-blob-storage-file.interface'

@Injectable({
  providedIn: 'root'
})
export class AzureBlobStorageService implements IAzureBlobStorageService {
  private _files: Subject<AzureBlobStorageFile[]> = new Subject<
    AzureBlobStorageFile[]
  >()
  readonly files$ = this._files.asObservable()
  private files: AzureBlobStorageFile[] = []

  private uploadEndSource = new Subject<void>()
  public uploadEnd$ = this.uploadEndSource.asObservable()

  private allTasksController = new AbortController()
  private zipMimeTypes = [
    'application/x-rar-compressed',
    'application/octet-stream',
    'application/zip',
    'application/octet-stream',
    'application/x-zip-compressed',
    'multipart/x-zip'
  ]

  constructor(private documentUploadInfoGQL: DocumentUploadInfoGQL) {}

  /**
   * Removes all files
   */
  public removeAllFiles() {
    this.files.splice(0, this.files.length)
    this._files.next(this.files.slice())
  }

  /**
   * Removes file from the files
   * @param {file} AzureBlobStorageFile
   */
  public removeFile(file: AzureBlobStorageFile) {
    this.files.splice(this.files.indexOf(file), 1)
    this._files.next(this.files.slice())
  }

  /**
   * Adds new file to the files
   * @param {file} AzureBlobStorageFile
   */
  public addFile(file: AzureBlobStorageFile) {
    this.files.push(file)
    this._files.next(this.files.slice())
  }

  /**
   * Get all active uploads and processing files
   * @returns {AzureBlobStorageFile[]}
   */
  public get activeUploads(): AzureBlobStorageFile[] {
    return this.files.filter((file) => !file.uploaded && !file.canceled)
  }

  /**
   * Get all active processing files
   * @returns {AzureBlobStorageFile[]}
   */
  public get activeProcessingFiles(): AzureBlobStorageFile[] {
    return this.files.filter((file) => file.uploaded && !file.processed)
  }

  /**
   * Get azure blob storage file
   * @param {id} string
   * @returns {AzureBlobStorageFile}
   */
  private getFile(id: string) {
    return this.files.find((file) => file.id === id) as AzureBlobStorageFile
  }

  /**
   * Get upload info for file
   * @param {File} file
   * @returns {Observable<DocumentUploadInfoFragment>}
   */
  public getUploadInfo(
    file: File,
    siteId: string,
    categoryCodeName: string,
    culture: string
  ): Observable<DocumentUploadInfoFragment> {
    return this.documentUploadInfoGQL
      .fetch(
        {
          documentName: file.name,
          siteId,
          categoryCodeName,
          culture
        },
        {
          fetchPolicy: 'no-cache'
        }
      )
      .pipe(map((result) => result.data.documentUploadInfo))
  }

  /**
   * Upload file to blob storage
   * @param {DocumentUploadInfoFragment} documentUploadInfo
   * @param {File} file
   * @param {categoryCodeName} string
   * @returns {Observable<DocumentUploadInfoFragment>}
   */
  public upload(
    documentUploadInfo: DocumentUploadInfoFragment,
    file: File,
    categoryName: string,
    siteId: string,
    categoryCodeName: string,
    culture: string
  ): Observable<DocumentUploadInfoFragment> {
    const fileId = uuidv4()
    const subTask = new AbortController(this.allTasksController.signal)

    this.addFile({
      id: fileId,
      name: file.name,
      category: categoryName,
      size: file.size,
      progress: 0,
      uploaded: false,
      processed: false,
      canceled: false,
      abortController: subTask
    })

    const blobStorageFile = this.getFile(fileId)

    return new Observable<DocumentUploadInfoFragment>((observer) => {
      const blockBlobClient = new BlockBlobClient(
        documentUploadInfo.fullBlobUri,
        newPipeline()
      )

      blockBlobClient
        .uploadData(file, {
          abortSignal: subTask.signal,
          metadata: {
            site: siteId,
            category: categoryCodeName,
            culture
          },
          blobHTTPHeaders: { blobContentType: file.type },
          onProgress: (progress: TransferProgressEvent) => {
            blobStorageFile.progress = Math.round(
              (progress.loadedBytes / file.size) * 100
            )
          }
        })
        .then(
          () => {
            this.setBlobStorageFileUploadState(
              file,
              blockBlobClient,
              blobStorageFile
            )
            observer.next(documentUploadInfo)
            observer.complete()
          },
          (error: any) => {
            observer.error(error)
          }
        )
    }).pipe(
      distinctUntilChanged(),
      catchError((error) =>
        throwError(() => {
          if (error?.name !== 'AbortError') {
            this.removeFile(blobStorageFile)
          }
          return error
        })
      )
    )
  }

  /**
   * set blob storage file processed state based on file types
   * @param {file} File
   * @param {blockBlobClient} BlockBlobClient
   * @param {blobStorageFile} AzureBlobStorageFile
   */
  private setBlobStorageFileUploadState(
    file: File,
    blockBlobClient: BlockBlobClient,
    blobStorageFile: AzureBlobStorageFile
  ) {
    blobStorageFile.uploaded = true

    // zip file - check if it exists on azure blob upload storage
    // if not, it's been processed
    if (this.zipMimeTypes.indexOf(file.type) > -1) {
      const interval = setInterval(() => {
        blockBlobClient.exists().then((value) => {
          if (!value) {
            blobStorageFile.processed = true
            this.uploadEndSource.next()

            clearInterval(interval)
          }
        })
      }, 10000)
    } else {
      // PDF file - it goes directly to azure blob document storage
      // it never exists on auzre blob upload storage
      blobStorageFile.processed = true
    }
  }

  /**
   * Cancel specific file upload
   * @param {fileId} string
   */
  public cancelFile(fileId: string) {
    const file = this.getFile(fileId)

    file.progress = 100
    file.canceled = true
    file.abortController.abort()
  }

  /**
   * Cancel all file uploads
   */
  public cancelAllFiles() {
    this.files.forEach((file) => {
      if (!file.canceled) file.canceled = true
      file.progress = 100

      if (!file.uploaded) file.abortController.abort()
    })
  }
}
