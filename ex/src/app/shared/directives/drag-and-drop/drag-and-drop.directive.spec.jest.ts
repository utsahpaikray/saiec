/**
 * @jest-environment jsdom
 */
import { Component, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import dragAndDropActions from '@stores/drag-and-drop/drag-and-drop.actions'
import { DragAndDropDirective } from './drag-and-drop.directive'

@Component({
  template: `
    <div appDragAndDrop="target">
      <div appDragAndDrop="host"></div>
    </div>
  `
})
class TestComponent {}

describe('DragAndDropDirective', () => {
  let fixture: ComponentFixture<TestComponent>
  let directiveElement: DebugElement
  let hostElement: DebugElement
  let store: MockStore
  let dispatchSpy: jest.SpyInstance

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, DragAndDropDirective],
      providers: [
        provideMockStore({
          initialState: {
            dragAndDrop: {
              files: null,
              items: null,
              error: null
            }
          }
        })
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    directiveElement = fixture.debugElement.query(
      By.directive(DragAndDropDirective)
    )
    store = TestBed.inject(MockStore)
    hostElement = directiveElement.query(By.css('[appDragAndDrop="host"]'))
    dispatchSpy = jest.spyOn(store, 'dispatch')
    fixture.detectChanges()
  })

  afterEach(() => {
    dispatchSpy.mockRestore()
  })

  it('should dispatch dragOver action on dragover', () => {
    const dataTransfer = new DataTransfer()
    const event = new DragEvent('dragover', {
      bubbles: true,
      cancelable: true,
      composed: true,
      dataTransfer
    })
    directiveElement.triggerEventHandler('dragover', event)
    expect(dispatchSpy).toHaveBeenCalledWith(
      dragAndDropActions.dragOver({ items: [] })
    )
  })

  it('should dispatch dragLeave action on dragleave', () => {
    const event = new DragEvent('dragleave', {
      bubbles: true,
      cancelable: true,
      composed: true
    })
    Object.defineProperty(event, 'target', {
      value: directiveElement.nativeElement
    })
    directiveElement.triggerEventHandler('dragleave', event)
    expect(dispatchSpy).toHaveBeenCalledWith(dragAndDropActions.dragLeave())
  })

  it('should dispatch dragCancel action on drop for host mode', () => {
    const event = new DragEvent('drop', {
      bubbles: true,
      cancelable: true,
      composed: true
    })
    hostElement.triggerEventHandler('drop', event)
    expect(dispatchSpy).toHaveBeenCalledWith(dragAndDropActions.dragCancel())
  })

  it('should dispatch reset action on ngOnDestroy', () => {
    const directive = directiveElement.injector.get(DragAndDropDirective)
    directive.ngOnDestroy()
    expect(dispatchSpy).toHaveBeenCalledWith(dragAndDropActions.reset())
  })
})
