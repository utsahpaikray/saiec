import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DocumentTableFileComponent } from './document-table-file.component'
import { FileSizePipe } from '@core/pipes/file-size.pipe'
import { By } from '@angular/platform-browser'
import { SafeHtmlPipe } from '@core/pipes/safe-html.pipe'
import { DocumentDownloadService } from '../../../core/document-download/document-download.service'

describe('DocumentTableFileComponent', () => {
  let component: DocumentTableFileComponent
  let fixture: ComponentFixture<DocumentTableFileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentTableFileComponent, FileSizePipe, SafeHtmlPipe],
      providers: [
        {
          provide: DocumentDownloadService,
          useValue: {
            download: () => {}
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTableFileComponent)
    component = fixture.componentInstance
    component.document = {
      name: 'Test',
      contentLength: 483802,
      depth: 0
    }

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render correct name', () => {
    const name = fixture.debugElement.query(
      By.css('[data-testid="table-file-name"]')
    )

    expect(name.nativeElement.textContent.trim()).toBe(component.document.name)
  })

  it('should render correct file length', () => {
    const contentLength = fixture.debugElement.query(
      By.css('[data-testid="table-file-content-length"]')
    )

    expect(contentLength.nativeElement.textContent.trim()).toBe('472 KB')
  })

  it('should not have identation', () => {
    const iconNameWrapper = fixture.debugElement.query(
      By.css('[data-testid="table-file-icon-name-wrapper"]')
    )
    const icon = fixture.debugElement.query(
      By.css('[data-testid="table-file-icon"]')
    )
    const name = fixture.debugElement.query(
      By.css('[data-testid="table-file-name"]')
    )
    const contentLength = fixture.debugElement.query(
      By.css('[data-testid="table-file-content-length"]')
    )

    expect(iconNameWrapper.nativeElement.style.marginLeft).toBe('0rem')
    expect(icon.nativeElement.classList.value).toBe('')
    expect(name.nativeElement.classList.contains('font-bold')).toEqual(true)
    expect(contentLength.nativeElement.style.paddingLeft).toBeFalsy()
  })

  it('should have correct identation', () => {
    component.document.depth = 2
    fixture.detectChanges()

    const iconNameWrapper = fixture.debugElement.query(
      By.css('[data-testid="table-file-icon-name-wrapper"]')
    )
    const icon = fixture.debugElement.query(
      By.css('[data-testid="table-file-icon"]')
    )
    const name = fixture.debugElement.query(
      By.css('[data-testid="table-file-name"]')
    )
    const contentLength = fixture.debugElement.query(
      By.css('[data-testid="table-file-content-length"]')
    )

    expect(iconNameWrapper.nativeElement.style.marginLeft).toBe(
      `${component.identationLeft * component.document.depth}rem`
    )
    expect(icon.nativeElement.classList.value).toBe(
      'table-file-icon d-flex items-start gap-xs before:mt-xs before:block before:h-3 before:w-6 before:border-blue-500'
    )
    expect(name.nativeElement.classList.contains('font-medium')).toEqual(false)
    expect(contentLength.nativeElement.style.paddingLeft).toBe(
      `${
        component.identationLeft * component.document.depth +
        component.identationWithIcons -
        component.identationLeft
      }rem`
    )
  })

  it('should create location column when document has location property', () => {
    component.document.location = 'test'

    fixture.detectChanges()

    const location = fixture.debugElement.query(
      By.css('[data-testid="table-file-location"]')
    )
    expect(location).toBeTruthy()
  })
})
