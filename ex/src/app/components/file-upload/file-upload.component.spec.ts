import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { Alert } from '../alert/alert.model'

import { FileUploadComponent } from './file-upload.component'

describe('FileUploadComponent', () => {
  let component: FileUploadComponent
  let fixture: ComponentFixture<FileUploadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      imports: [getTranslocoModule()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should render the button', async () => {
    component.buttonLabel = 'Test label'
    component.buttonVariant = 'primary'
    fixture.detectChanges()
    await fixture.whenStable()

    const uploadButton = fixture.debugElement.query(
      By.css('[data-testid="file-upload-button"]')
    )
    expect(uploadButton.nativeElement.textContent.trim()).toEqual(
      component.buttonLabel
    )
  })

  it('should render the file list', async () => {
    component.files = [new File([''], 'test.pdf'), new File([''], 'test2.pdf')]
    fixture.detectChanges()
    await fixture.whenStable()

    const firstFile = fixture.debugElement.query(
      By.css('[data-testid="file-upload-file-0"]')
    )
    const firstdeleteButton = fixture.debugElement.query(
      By.css('[data-testid="file-delete-button-0"]')
    )
    const secondFile = fixture.debugElement.query(
      By.css('[data-testid="file-upload-file-1"]')
    )
    const seconddeleteButton = fixture.debugElement.query(
      By.css('[data-testid="file-delete-button-1"]')
    )
    expect(firstFile).toBeTruthy()
    expect(firstdeleteButton).toBeTruthy()
    expect(firstFile.nativeElement.textContent.trim()).toEqual('test.pdf')
    expect(secondFile).toBeTruthy()
    expect(seconddeleteButton).toBeTruthy()
    expect(secondFile.nativeElement.textContent.trim()).toEqual('test2.pdf')
  })

  it('should delete file from file list', async () => {
    spyOn(component.changeEvent, 'emit')
    const file1 = new File([''], 'test.pdf')
    const file2 = new File([''], 'test2.pdf')
    component.files = [file1, file2]
    fixture.detectChanges()
    await fixture.whenStable()

    const deleteButton = fixture.debugElement.query(
      By.css('[data-testid="file-delete-button-0"]')
    )

    expect(component.files.length).toEqual(2)
    deleteButton.nativeElement.click()

    fixture.detectChanges()
    await fixture.whenStable()

    const firstFile = fixture.debugElement.query(
      By.css('[data-testid="file-upload-file-0"]')
    )
    const secondFile = fixture.debugElement.query(
      By.css('[data-testid="file-upload-file-1"]')
    )

    expect(component.changeEvent.emit).toHaveBeenCalledOnceWith([file2])
    expect(component.files.length).toEqual(1)
    expect(component.files[0].name).toEqual('test2.pdf')
    expect(firstFile).toBeTruthy()
    expect(secondFile).toBeFalsy()
    expect(firstFile.nativeElement.textContent.trim()).toEqual('test2.pdf')
  })

  describe('file alert', () => {
    it('should show alert if it exists, showAlert and alert message is true', async () => {
      const alertMessage = 'Please select a file.'
      component.showAlert = true
      component.alertMessage = alertMessage
      const alert = new Alert('error', alertMessage)
      component.alert = alert
      fixture.detectChanges()
      await fixture.whenStable()

      const fileUploadAlert = fixture.debugElement.query(
        By.css('[data-testid="file-upload-alert"]')
      )
      expect(fileUploadAlert).toBeTruthy()
    })

    it('should not show alert if it does not exist', async () => {
      const alert = null
      component.alert = alert
      fixture.detectChanges()
      await fixture.whenStable()

      const fileUploadAlert = fixture.debugElement.query(
        By.css('[data-testid="file-upload-alert"]')
      )
      expect(fileUploadAlert).toBeFalsy()
    })

    it('should not show alert if showAlert is false', async () => {
      component.showAlert = false
      fixture.detectChanges()
      await fixture.whenStable()

      const fileUploadAlert = fixture.debugElement.query(
        By.css('[data-testid="file-upload-alert"]')
      )
      expect(fileUploadAlert).toBeFalsy()
    })

    it('should not show alert if alertMessage does not exist', async () => {
      component.alertMessage = ''
      fixture.detectChanges()
      await fixture.whenStable()

      const fileUploadAlert = fixture.debugElement.query(
        By.css('[data-testid="file-upload-alert"]')
      )
      expect(fileUploadAlert).toBeFalsy()
    })
  })
})
