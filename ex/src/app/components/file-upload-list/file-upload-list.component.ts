import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AzureBlobStorageFile } from '@core/azure/azure-blob-storage-file.interface'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-file-upload-list',
  templateUrl: './file-upload-list.component.html',
  styleUrls: ['./file-upload-list.component.scss']
})
export class FileUploadListComponent {
  /**
   * Observable azure blob storage file array
   */
  @Input()
  files$: Observable<AzureBlobStorageFile[]>

  /**
   * Cancel file upload progress handler
   */
  @Output() cancelFileUploadProgress: EventEmitter<string> =
    new EventEmitter<string>()

  public cancelProgressBarByFileId(fileId: string): void {
    this.cancelFileUploadProgress.emit(fileId)
  }
}
