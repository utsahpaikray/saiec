import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { SortByPipe } from '@core/pipes/sort-by.pipe'

import { DocumentTableComponent } from './document-table.component'

const MockDocumentsWithChildren = [
  {
    contentLength: 650500,
    depth: 0,
    fullName:
      'sites/06800e26-a2b4-4ec2-8e6c-ec7c19c16dee/categories/OM/en-US/10166-072-99999-FR-A DHL CdG O&M manual.pdf',
    name: '10166-072-99999-FR-A DHL CdG O&M manual.pdf'
  },
  {
    children: [
      {
        contentLength: 2632810,
        depth: 1,
        fullName:
          'sites/06800e26-a2b4-4ec2-8e6c-ec7c19c16dee/categories/OM/en-US/Operator documents/10166-482-01001-FR-A Directives de documentation.pdf',
        name: '10166-482-01001-FR-A Directives de documentation.pdf'
      }
    ],
    depth: 0,
    name: 'Operator documents'
  }
]

const MockDocumentsWithLocation = [
  {
    contentLength: 8967134,
    depth: 0,
    fullName:
      'sites/1/categories/1/en-gb/Technical documents/Chapter 1.4 Controls item drawings/010166-100-EN-A01 Controls item drawing regarding 010166-100-00001.pdf',
    location:
      'Certifications / Technical documents / Chapter 1.4 Controls item drawings',
    name: '010166-<mark>100</mark>-EN-A01 Controls item drawing regarding 010166-<mark>100</mark>-00001.pdf'
  }
]

describe('DocumentTableComponent', () => {
  let component: DocumentTableComponent
  let fixture: ComponentFixture<DocumentTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
      declarations: [DocumentTableComponent, SortByPipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTableComponent)
    component = fixture.componentInstance
    component.documents = MockDocumentsWithChildren
    fixture.detectChanges()
  })

  it('should show table folder and file with correct header when document has children', () => {
    const tableHeaderTitle = fixture.debugElement.query(
      By.css('[data-testid="table-header-title"]')
    )
    expect(tableHeaderTitle).toBeTruthy()
    const tableHeaderSize = fixture.debugElement.query(
      By.css('[data-testid="table-header-size"]')
    )
    expect(tableHeaderSize).toBeTruthy()
    const tableHeaderLocation = fixture.debugElement.query(
      By.css('[data-testid="table-header-location"]')
    )
    expect(tableHeaderLocation).toBeFalsy()
    const firstDocumentTableFolder = fixture.debugElement.query(
      By.css('[data-testid="document-table-folder-0"]')
    )
    expect(firstDocumentTableFolder).toBeTruthy()
    const documentTableFiles = fixture.debugElement.queryAll(
      By.css('[data-testid="document-table-file"]')
    )
    expect(documentTableFiles).toBeTruthy()
  })

  it('should show location as table header when location exist in document object', () => {
    component.documents = MockDocumentsWithLocation
    fixture.detectChanges()
    const tableHeaderLocation = fixture.debugElement.query(
      By.css('[data-testid="table-header-location"]')
    )
    expect(tableHeaderLocation).toBeTruthy()
  })

  it('should show not found message when document does not exist', () => {
    component.documents = []
    fixture.detectChanges()
    const notFoundMessage = fixture.debugElement.query(
      By.css('[data-testid="document-table-not-found"]')
    )
    expect(notFoundMessage).toBeTruthy()
  })

  it('show loading spinner', () => {
    component.loading = true
    fixture.detectChanges()

    const loadingSpinner = fixture.debugElement.query(
      By.css('[data-testid="document-table-spinner"]')
    )
    expect(loadingSpinner).toBeTruthy()
  })

  it('do not show loading spinner', () => {
    component.loading = false
    fixture.detectChanges()

    const loadingSpinner = fixture.debugElement.query(
      By.css('[data-testid="document-table-spinner"]')
    )
    expect(loadingSpinner).toBeFalsy()
  })
})
