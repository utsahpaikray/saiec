import { Component, inject, ViewContainerRef } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  DialogRef,
  DialogService,
  DIALOG_DATA,
  DIALOG_REF
} from './dialog.service'

@Component({
  template: '<ng-template #dialogTemplate></ng-template>'
})
class TestHostComponent {
  public viewContainerRef = inject(ViewContainerRef)
}

@Component({
  selector: 'app-dialog-content',
  standalone: true,
  template: '<p>Test dialog</p>'
})
class DialogComponent {
  public dialogData = inject(DIALOG_DATA)
  public dialogRef = inject(DIALOG_REF)
}

describe('DialogService', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let service: DialogService
  let viewContainerRef: ViewContainerRef
  let dialogRef: DialogRef
  const siteId = 'siteId'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    service = TestBed.inject(DialogService)

    viewContainerRef = fixture.componentInstance.viewContainerRef
    dialogRef = service.create(viewContainerRef, siteId, DialogComponent)
  })

  afterEach(() => {
    // Remove the fixture's native element between tests.
    // TestBed doesn't do this for you, so otherwise you will have an element left over in the DOM after the last test.
    fixture.nativeElement.remove()
    // Get a fresh TestBed configuration between tests.
    TestBed.resetTestingModule()
  })

  it('should create dialog correctly', () => {
    expect(dialogRef.componentRef.componentType).toBe(DialogComponent)
    expect(dialogRef.componentRef.instance.dialogData).toEqual(siteId)
    expect(dialogRef.componentRef.instance.dialogRef.close).toBeTruthy()
    expect(dialogRef.close).toBeTruthy()
    expect(dialogRef.result$).toBeTruthy()
  })

  it('should close dialog and pass the value to the result$ observable', () => {
    dialogRef.result$.subscribe((result) => expect(result).toEqual(siteId))

    dialogRef.close(siteId)
  })
})
