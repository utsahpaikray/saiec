import { Component, Input } from '@angular/core';
import { FileUploadService } from '../../../shared-service/file-upload.service';
import { FileUpload } from '../../../model/file-upload';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent  {
  @Input() fileUpload!: FileUpload;
  constructor(private uploadService: FileUploadService) { }
  
  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}
