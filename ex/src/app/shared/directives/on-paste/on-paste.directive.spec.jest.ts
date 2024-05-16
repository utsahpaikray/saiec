import { Component, DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { OnPasteDirective } from './on-paste.directive'

@Component({
  template: ` <div appOnPaste (pasted)="onPasted($event)"></div> `
})
class TestComponent {
  files: File[] = []

  onPasted(files: File[]) {
    this.files = files
  }
}

describe('OnPasteDirective', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  let directiveElement: DebugElement

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [OnPasteDirective]
    })

    fixture = TestBed.createComponent(TestComponent)
    directiveElement = fixture.debugElement.query(
      By.directive(OnPasteDirective)
    )
    component = fixture.componentInstance
  })

  it('should emit pasted files when a paste event occurs', () => {
    const mockFiles: File[] = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'file2.txt', { type: 'text/plain' })
    ]
    const dataTransfer = new DataTransfer()
    Object.assign(dataTransfer, { files: mockFiles })
    const pasteEvent = new ClipboardEvent('paste')
    Object.assign(pasteEvent, { clipboardData: dataTransfer })

    jest.spyOn(component, 'onPasted')

    directiveElement.triggerEventHandler('paste', pasteEvent)

    expect(component.onPasted).toHaveBeenCalled()
  })

  it('should prevent default behavior when a paste event occurs', () => {
    const mockFiles: File[] = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'file2.txt', { type: 'text/plain' })
    ]

    const dataTransfer = new DataTransfer()
    Object.assign(dataTransfer, { files: mockFiles })
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: dataTransfer
    })

    jest.spyOn(pasteEvent, 'preventDefault')

    directiveElement.triggerEventHandler('paste', pasteEvent)

    expect(pasteEvent.preventDefault).toHaveBeenCalled()
  })

  it('should NOT prevent default behavior when a paste event occurs without files', () => {
    const pasteEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer()
    })

    jest.spyOn(pasteEvent, 'preventDefault')

    directiveElement.triggerEventHandler('paste', pasteEvent)

    expect(pasteEvent.preventDefault).toHaveBeenCalledTimes(0)
  })
})
