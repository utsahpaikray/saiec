import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing'
import { ModalService } from '@components/modal/modal.service'
import { By } from '@angular/platform-browser'
import { AddAttachmentModalComponent } from './add-attachment-modal.component'
import enData from '@assets/i18n/en-US.json'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { HttpClientModule } from '@angular/common/http'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { ToasterService } from '@components/toaster/toaster.service'
import { Toast } from '@components/toaster/toast/toast.model'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import { of } from 'rxjs'
import { Viewports } from '@core/interfaces/breakpoint.enum'

describe('AddAttachmentModalComponent', () => {
  let component: AddAttachmentModalComponent
  let fixture: ComponentFixture<AddAttachmentModalComponent>
  let modalService: ModalService
  let toastService: ToasterService
  let windowResizeService: WindowResizeService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddAttachmentModalComponent,
        HttpClientModule,
        ApolloTestingModule,
        getTranslocoModule(),
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(AddAttachmentModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    modalService = TestBed.inject(ModalService)
    toastService = TestBed.inject(ToasterService)
    windowResizeService = TestBed.inject(WindowResizeService)

    component.breakpoint$ = of(Viewports.Desktop)
  })

  it('should render upload button correctly', () => {
    const openModalButtonText = 'hello'
    component.openModalButtonText = openModalButtonText
    fixture.detectChanges()

    const selectAssetButton = fixture.debugElement.query(
      By.css('[data-testid="add-attachment-button"]')
    )

    expect(selectAssetButton.nativeElement.innerText).toContain(
      openModalButtonText.toUpperCase()
    )
    expect(
      selectAssetButton.nativeElement.children[0].attributes[0].nodeValue
    ).toBe('attachment')
  })

  it('should upload file, open modal and initialize form with correct description', () => {
    const event = {
      target: {
        files: {
          0: {
            lastModified: 1673960502478,
            name: 'translation.xlsx',
            size: 87854,
            webkitRelativePath: ''
          }
        }
      }
    }
    spyOn(modalService, 'open').and.callThrough()

    component.uploadFile(event)
    fixture.detectChanges()

    expect(modalService.open).toHaveBeenCalledWith(component.modalId)
    expect(component.form.value.description).toEqual('')
    expect(component.fileToUpload.name).toEqual(event.target.files[0].name)
    expect(component.fileToUpload.lastModified).toEqual(
      event.target.files[0].lastModified
    )
    expect(component.fileToUpload.webkitRelativePath).toEqual(
      event.target.files[0].webkitRelativePath
    )

    const fileName = fixture.debugElement.query(
      By.css('[data-testid="add-attachment-file-name"]')
    )
    expect(fileName.nativeElement.textContent.trim()).toEqual(
      event.target.files[0].name
    )
  })

  it('should send document formatted', fakeAsync(() => {
    const event = {
      target: {
        files: {
          0: {
            lastModified: 1673960502478,
            name: 'translation.xlsx',
            size: 87854,
            webkitRelativePath: ''
          }
        }
      }
    }

    const documentEvent = {
      description: 'test description',
      documentData: 'testfilepath',
      documentName: event.target.files[0].name
    }

    spyOn(modalService, 'open').and.callThrough()
    spyOn(component, 'onSubmit').and.callThrough()
    spyOn(component, 'convertFileToBase64').and.returnValue(
      Promise.resolve(documentEvent.documentData)
    )
    spyOn(component.addDocumentEvent, 'emit').and.callThrough()

    component.uploadFile(event)
    component.description.patchValue('test description')
    fixture.detectChanges()

    expect(modalService.open).toHaveBeenCalledWith(component.modalId)

    const addAttachmentConfirmationButton = fixture.debugElement.query(
      By.css('[data-testid="add-attachment-confirmation-button"]')
    )

    addAttachmentConfirmationButton.nativeElement.click()
    tick()

    expect(component.onSubmit).toHaveBeenCalled()
    expect(component.addDocumentEvent.emit).toHaveBeenCalledWith(documentEvent)
  }))

  it('should show exceed file size alert and not open the modal', () => {
    const event = {
      target: {
        files: {
          0: {
            lastModified: 1673960502478,
            name: 'translation.xlsx',
            size: 11000000,
            webkitRelativePath: ''
          }
        }
      }
    }
    spyOn(toastService, 'addToast')
    spyOn(modalService, 'open').and.callThrough()

    component.uploadFile(event)
    fixture.detectChanges()

    expect(modalService.open).not.toHaveBeenCalled()
    const error = new Toast('error', enData.Attachments.FileSizeError)
    expect(toastService.addToast).toHaveBeenCalledWith(error)
  })

  it('should show wrong file type alert and not open the modal', () => {
    const event = {
      target: {
        files: {
          0: {
            lastModified: 1673960502478,
            name: 'translation.exe',
            size: 87854,
            webkitRelativePath: ''
          }
        }
      }
    }
    spyOn(toastService, 'addToast')
    spyOn(modalService, 'open').and.callThrough()

    component.uploadFile(event)
    fixture.detectChanges()

    expect(modalService.open).not.toHaveBeenCalled()
    const error = new Toast(
      'error',
      enData.General.FileTypeWarning +
        ' ' +
        event.target.files[0].name.split('.').pop()?.toLocaleLowerCase()
    )
    expect(toastService.addToast).toHaveBeenCalledWith(error)
  })
})
