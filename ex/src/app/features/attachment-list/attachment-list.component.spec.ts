import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AttachmentListComponent } from './attachment-list.component'
import { By } from '@angular/platform-browser'
import { DocumentInputType } from './attachment-list.interface'

export const mockDocuments: DocumentInputType[] = [
  {
    id: '1',
    documentName: 'doc 1',
    description: 'pdf doc',
    documentData:
      'n7D28U5G0tNr19HFkmKRoB+9TBne3+rRC9qRYaDx7VMB7K5vxamWDjDaAz7NXoJ9w5PENk0ylcZHZhrse+'
  },
  {
    id: '2',
    documentName: 'doc 2',
    description: 'doc doc',
    documentData:
      'n7D28U5G0tNr19HFkmKRoB+9TBne3+rRC9qRYaDx7VMB7K5vxamWDjDaAz7NXoJ9w5PENk0ylcZHZhrse+'
  }
]

describe('AttachmentListComponent', () => {
  let component: AttachmentListComponent
  let fixture: ComponentFixture<AttachmentListComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AttachmentListComponent]
    })
    fixture = TestBed.createComponent(AttachmentListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should show attachment list', () => {
    component.attachments = mockDocuments
    fixture.detectChanges()

    const attachmentList = fixture.debugElement.query(
      By.css('[data-testid="attachment-list"]')
    )
    expect(attachmentList).toBeTruthy()
  })

  it('should show attachment details correctly', () => {
    component.attachments = mockDocuments
    fixture.detectChanges()

    const attachmentName = fixture.debugElement.query(
      By.css('[data-testid="attachment-name"]')
    )
    const attachmentDescription = fixture.debugElement.query(
      By.css('[data-testid="attachment-description"]')
    )
    expect(attachmentName.nativeElement.innerText.trim()).toBe(
      mockDocuments[0].documentName
    )
    expect(attachmentDescription.nativeElement.innerText.trim()).toBe(
      mockDocuments[0].description
    )
  })

  it('should trigger remove event with attachment id', () => {
    spyOn(component.remove, 'emit').and.callThrough()

    component.attachments = mockDocuments
    fixture.detectChanges()

    const removeButton = fixture.debugElement.query(
      By.css('[data-testid="attachment-delete-button"]')
    )
    removeButton.triggerEventHandler('click', {
      target: removeButton.nativeElement
    })
    fixture.detectChanges()

    expect(component.remove.emit).toHaveBeenCalledWith(mockDocuments[0].id)
  })
})
