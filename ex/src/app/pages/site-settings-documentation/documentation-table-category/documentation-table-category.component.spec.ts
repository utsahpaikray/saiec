import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { By } from '@angular/platform-browser'

import { DocumentDownloadService } from '@core/document-download/document-download.service'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { FileSizeModule } from '@core/pipes/file-size.module'
import { ExpansionPanelComponent } from '@components/expansion-panel/expansion-panel.component'

import { DocumentationTableCategoryComponent } from './documentation-table-category.component'
import { HttpClientModule } from '@angular/common/http'

const MockedDocumentCategoryWithDocuments = {
  name: 'Certifications',
  documents: [
    {
      contentLength: 975702815,
      culture: 'Français',
      name: 'sites/1/categories/CERTIFICATIONS/fr-FR/Operator documents/10166-482-01002-EN-A Documentation guidelines.pdf',
      isLoading: false,
      deleted: false
    }
  ],
  documentsAmount: 1,
  isOpen: false
}

const MockedDocumentCategoryWithoutDocuments = {
  name: 'Certifications',
  documents: [],
  documentsAmount: 0,
  isOpen: false
}

describe('DocumentationTableCategoryComponent', () => {
  let component: DocumentationTableCategoryComponent
  let fixture: ComponentFixture<DocumentationTableCategoryComponent>
  let documentDownloadService: DocumentDownloadService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        FileSizeModule,
        ApolloTestingModule,
        HttpClientModule
      ],
      declarations: [
        DocumentationTableCategoryComponent,
        ExpansionPanelComponent
      ],
      providers: [DocumentDownloadService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationTableCategoryComponent)
    component = fixture.componentInstance
    documentDownloadService = TestBed.inject(DocumentDownloadService)
  })

  describe('with documents', () => {
    beforeEach(() => {
      component.category = JSON.parse(
        JSON.stringify(MockedDocumentCategoryWithDocuments)
      )
      component.siteId = 'siteId'
      fixture.debugElement.injector.get(DocumentDownloadService)
      fixture.detectChanges()
    })

    it('should render name correctly', () => {
      const tableDocumentName = fixture.debugElement.query(
        By.css('[data-testid="table-file-name"]')
      )

      expect(tableDocumentName.nativeElement.textContent.trim()).toBe(
        MockedDocumentCategoryWithDocuments.documents[0].name.split('/').pop()
      )
    })

    it('should render right amount of documents', () => {
      const documentsAmount = fixture.debugElement.query(
        By.css('[data-testid="table-category-amount"]')
      )
      expect(documentsAmount.nativeElement.textContent.trim()).toBe(
        `${MockedDocumentCategoryWithDocuments.documents.length}`
      )
    })

    it('should render language correctly', () => {
      const tableDocumentLanguage = fixture.debugElement.query(
        By.css('[data-testid="table-file-culture"]')
      )

      expect(tableDocumentLanguage.nativeElement.textContent.trim()).toBe(
        MockedDocumentCategoryWithDocuments.documents[0].culture
      )
    })

    it('should render size correctly', () => {
      const tableDocumentSize = fixture.debugElement.query(
        By.css('[data-testid="table-file-content-length"]')
      )

      expect(tableDocumentSize.nativeElement.textContent.trim()).toBe(
        '930.5 MB'
      )
    })

    it('should set toggle event correctly', () => {
      const tableCategory = fixture.debugElement.query(
        By.css('[data-testid="documentation-table-category"]')
      )
      tableCategory.triggerEventHandler('toggleEvent', true)
      fixture.detectChanges()

      expect(component.category.isOpen).toBe(true)
    })

    it('should trigger delete event', () => {
      spyOn(component.documentDelete, 'emit')
      spyOn(documentDownloadService, 'download')

      const tableCategory = fixture.debugElement.query(
        By.css('[data-testid="documentation-table-category"]')
      )
      const tableDocumentTrash = fixture.debugElement.query(
        By.css('[data-testid="table-document-trash"]')
      )
      const tableDocumentDownload = fixture.debugElement.query(
        By.css('[data-testid="table-document-download"]')
      )

      tableCategory.triggerEventHandler('toggleEvent', true)

      tableDocumentTrash.triggerEventHandler('click', {
        target: tableDocumentTrash.nativeElement
      })
      tableDocumentDownload.triggerEventHandler('click', {
        target: tableDocumentDownload.nativeElement
      })
      fixture.detectChanges()

      expect(component.documentDelete.emit).toHaveBeenCalledWith({
        index: 0,
        name: MockedDocumentCategoryWithDocuments.documents[0].name
      })

      expect(documentDownloadService.download).toHaveBeenCalled()
    })
  })

  describe('without documents', () => {
    beforeEach(() => {
      component.category = JSON.parse(
        JSON.stringify(MockedDocumentCategoryWithoutDocuments)
      )
      component.siteId = 'siteId'
      fixture.detectChanges()
    })

    it('should not trigger toggle event', () => {
      const tableCategory = fixture.debugElement.query(
        By.css('[data-testid="documentation-table-category"]')
      )
      tableCategory.triggerEventHandler('toggleEvent', true)
      fixture.detectChanges()

      expect(component.category.isOpen).toBe(false)
    })
  })
})
