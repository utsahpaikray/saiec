import { AbortController } from '@azure/abort-controller'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AzureBlobStorageService } from '@core/azure/azure-blob-storage.service'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { ProgressBarComponent } from '../progress-bar/progress-bar.component'

import { FileUploadListComponent } from './file-upload-list.component'

const mockPdfFileUploaded = {
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

const mockZipFileUploading = {
  id: '01b6b4d9-6f9f-4161-9bf2-2af3d4eb6574',
  name: 'uploading-file.zip',
  category: 'O&M manual',
  size: 975703087,
  progress: 7,
  uploaded: false,
  canceled: false,
  processed: false,
  abortController: new AbortController()
}

const mockZipFileProcessing = {
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

describe('FileUploadListComponent', () => {
  let component: FileUploadListComponent
  let fixture: ComponentFixture<FileUploadListComponent>
  let blobStorageService: AzureBlobStorageService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadListComponent, ProgressBarComponent],
      imports: [ApolloTestingModule, getTranslocoModule()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    blobStorageService = TestBed.inject(AzureBlobStorageService)
  })

  it('should not show any file row when no file', async () => {
    const fileRow = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-row"]')
    )

    expect(fileRow).toBeFalsy()
  })

  it('should have correct file rows', async () => {
    component.files$ = blobStorageService.files$
    fixture.detectChanges()

    blobStorageService.addFile(mockPdfFileUploaded)
    blobStorageService.addFile(mockPdfFileUploaded)
    fixture.detectChanges()
    await fixture.whenStable()

    const fileRows = fixture.debugElement.queryAll(
      By.css('[data-testid="file-upload-list-row"]')
    )

    expect(fileRows.length).toEqual(2)
  })

  it('should show file name and category and progress bar when file exists', async () => {
    component.files$ = blobStorageService.files$
    fixture.detectChanges()

    blobStorageService.addFile(mockPdfFileUploaded)
    fixture.detectChanges()
    await fixture.whenStable()

    const fileName = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-name"]')
    )
    const fileCategory = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-category-0"]')
    )
    const fileProgressBar = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-progress-bar-0"]')
    )

    expect(fileName).toBeTruthy()
    expect(fileCategory).toBeTruthy()
    expect(fileProgressBar).toBeTruthy()
  })

  it('should show uploaded text and icon when file is uploaded', async () => {
    component.files$ = blobStorageService.files$
    fixture.detectChanges()

    blobStorageService.addFile(mockPdfFileUploaded)
    fixture.detectChanges()
    await fixture.whenStable()

    const uploadedText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploaded-0"]')
    )
    const uploadedIcon = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploaded-icon-0"]')
    )
    const uploadingText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploading-0"]')
    )
    const processingText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-processing-0"]')
    )
    const progressSpinner = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-progress-spinner-0"]')
    )
    const canceledText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-canceled-0"]')
    )
    const canceledIcon = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-canceled-icon-0"]')
    )
    expect(uploadedText).toBeTruthy()
    expect(uploadedIcon).toBeTruthy()
    expect(uploadingText).toBeFalsy()
    expect(processingText).toBeFalsy()
    expect(progressSpinner).toBeFalsy()
    expect(canceledText).toBeFalsy()
    expect(canceledIcon).toBeFalsy()
  })

  it('should show uploading text when file is uploading', async () => {
    component.files$ = blobStorageService.files$
    fixture.detectChanges()

    blobStorageService.addFile(mockZipFileUploading)
    fixture.detectChanges()
    await fixture.whenStable()

    const uploadingText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploading-0"]')
    )
    const uploadedText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploaded-0"]')
    )
    const uploadedIcon = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploaded-icon-0"]')
    )
    const processingText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-processing-0"]')
    )
    const progressSpinner = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-progress-spinner-0"]')
    )
    const canceledText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-canceled-0"]')
    )
    const canceledIcon = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-canceled-icon-0"]')
    )
    expect(uploadingText).toBeTruthy()
    expect(uploadedText).toBeFalsy()
    expect(uploadedIcon).toBeFalsy()
    expect(processingText).toBeFalsy()
    expect(progressSpinner).toBeFalsy()
    expect(canceledText).toBeFalsy()
    expect(canceledIcon).toBeFalsy()
  })

  it('should show processing text and spinner when file is processing', async () => {
    component.files$ = blobStorageService.files$
    fixture.detectChanges()

    blobStorageService.addFile(mockZipFileProcessing)
    fixture.detectChanges()
    await fixture.whenStable()

    const processingText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-processing-0"]')
    )
    const progressSpinner = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-progress-spinner-0"]')
    )
    const uploadingText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploading-0"]')
    )
    const uploadedText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploaded-0"]')
    )
    const uploadedIcon = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploaded-icon-0"]')
    )
    const canceledText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-canceled-0"]')
    )
    const canceledIcon = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-canceled-icon-0"]')
    )
    expect(processingText).toBeTruthy()
    expect(progressSpinner).toBeTruthy()
    expect(uploadingText).toBeFalsy()
    expect(uploadedText).toBeFalsy()
    expect(uploadedIcon).toBeFalsy()
    expect(canceledText).toBeFalsy()
    expect(canceledIcon).toBeFalsy()
  })

  it('should show canceled text and icon when file is canceled', async () => {
    component.files$ = blobStorageService.files$
    fixture.detectChanges()

    blobStorageService.addFile(mockZipFileCanceled)
    fixture.detectChanges()
    await fixture.whenStable()

    const canceledText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-canceled-0"]')
    )
    const canceledIcon = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-canceled-icon-0"]')
    )
    const processingText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-processing-0"]')
    )
    const progressSpinner = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-progress-spinner-0"]')
    )
    const uploadingText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploading-0"]')
    )
    const uploadedText = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploaded-0"]')
    )
    const uploadedIcon = fixture.debugElement.query(
      By.css('[data-testid="file-upload-list-uploaded-icon-0"]')
    )
    expect(canceledText).toBeTruthy()
    expect(canceledIcon).toBeTruthy()
    expect(processingText).toBeFalsy()
    expect(progressSpinner).toBeFalsy()
    expect(uploadingText).toBeFalsy()
    expect(uploadedText).toBeFalsy()
    expect(uploadedIcon).toBeFalsy()
  })

  it('should trigger cancel file upload progress event', () => {
    spyOn(component.cancelFileUploadProgress, 'emit')
    const testFileId = 'testFileId'

    component.cancelProgressBarByFileId(testFileId)
    fixture.detectChanges()

    expect(component.cancelFileUploadProgress.emit).toHaveBeenCalledWith(
      testFileId
    )
  })
})
