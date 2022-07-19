import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'
import { map } from 'rxjs/operators';
import { FileUploadService } from 'src/app/shared-service/file-upload.service';
@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {
  fileUploads?: any[];
  constructor(private uploadService: FileUploadService) { }
  ngOnInit(): void {
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      console.log(fileUploads)

      this.fileUploads = fileUploads;
      const data = this.fileUploads[0]['url'].arrayBuffer();
      /* data is an ArrayBuffer */
      const workbook = XLSX.read(data);
      console.log(workbook)
    });
  }
}