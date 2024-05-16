import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { Category, CategoryCulture } from '@core/generated/types'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { of } from 'rxjs'

import { DocumentationCategoryComponent } from './documentation-category.component'
import {
  DocumentCategoryDocument,
  DocumentCategoryGQL
} from './graphql/document-category.graphql-gen'

const MockCategories = {
  categories: [
    {
      codeName: 'GENERAL',
      categoryCultures: [
        {
          name: 'General',
          culture: 'en-US'
        },
        {
          name: 'Algemeen',
          culture: 'nl-NL'
        }
      ]
    }
  ],
  documentsBySite: [
    {
      name: 'sites/1/categories/GENERAL/en-US/10166-072-99999-EN-A DHL CdG O\u0026M manual.pdf',
      contentLength: 483802,
      culture: 'en-US'
    },
    {
      name: 'sites/1/categories/GENERAL/en-US/Operator documents/10166-482-01001-EN-A Documentation guidelines.pdf',
      contentLength: 2551398,
      culture: 'en-US'
    },
    {
      name: 'sites/1/categories/GENERAL/fr-FR/Operator documents/10166-482-01002-EN-A Documentation guidelines.pdf',
      contentLength: 2551398,
      culture: 'fr-FR'
    },
    {
      name: 'sites/1/categories/GENERAL/en-US/Technical documents/Chapter 1.3 Electrical drawings/10166-431-40014EM1-EN-A EM Component Layout LCC14 PLC400.pdf',
      contentLength: 359981,
      culture: 'en-US'
    },
    {
      contentLength: 321710,
      name: 'sites/1/categories/GENERAL/en-US/Technical documents/Chapter 1.3 Electrical drawings/10166-431-10016EP1-EN-B Power Layout LCC16 PLC100.pdf',
      culture: 'en-US'
    },
    {
      name: 'sites/1/categories/GENERAL/nl-NL/10166-072-99999-EN-A DHL CdG O\u0026M manual.pdf',
      contentLength: 359981,
      culture: 'nl-NL'
    }
  ]
}

function initializeDocumentCategoryData(
  controller: ApolloTestingController,
  query: DocumentCategoryGQL
) {
  spyOn(query, 'watch').and.callThrough()
  const documentCategoryOp = controller.expectOne(DocumentCategoryDocument)
  expect(documentCategoryOp.operation.operationName).toEqual('documentCategory')

  documentCategoryOp.flush({
    data: { ...MockCategories }
  })
}

describe('DocumentationCategoryComponent', () => {
  let component: DocumentationCategoryComponent
  let fixture: ComponentFixture<DocumentationCategoryComponent>
  let controller: ApolloTestingController
  let documentCategoryQuery: DocumentCategoryGQL

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, getTranslocoModule()],
      declarations: [DocumentationCategoryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              categoryCodeName: 'testCategoryCodeName',
              siteId: 'testSiteId'
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationCategoryComponent)
    component = fixture.componentInstance
    documentCategoryQuery = TestBed.inject(DocumentCategoryGQL)
    fixture.detectChanges()
  })

  it('gets correct data on init', () => {
    controller = TestBed.inject(ApolloTestingController)
    initializeDocumentCategoryData(controller, documentCategoryQuery)
    controller.verify()
    component.ngOnInit()

    expect(documentCategoryQuery.watch).toHaveBeenCalledWith(
      {
        categoryCodeName: 'testCategoryCodeName',
        siteId: 'testSiteId'
      },
      { useInitialLoading: true, fetchPolicy: 'no-cache' }
    )
  })

  describe('sets culture', () => {
    beforeEach(() => {
      component.documentsBySite = MockCategories.documentsBySite.slice(0)
    })

    it('sets selected culture to undefined if no available cultures', () => {
      component.availableCultures = []
      component.setCategoryDocuments({
        ...MockCategories.categories[0]
      } as Category)

      expect(component.selectedCulture).toEqual(undefined)
    })

    it('sets selected culture to first available option from local storage', () => {
      component.availableCultures = ['en-US', 'nl-NL']
      localStorage.setItem('MVI-document-category-culture', 'nl-NL')
      component.setCategoryDocuments({
        ...MockCategories.categories[0]
      } as Category)

      expect(component.selectedCulture).toEqual('nl-NL')
    })

    it('sets selected culture to first available option if current persisted culture is not available', () => {
      component.availableCultures = ['en-US', 'nl-NL']
      localStorage.setItem('MVI-document-category-culture', 'fr-FR')
      component.setCategoryDocuments({
        ...MockCategories.categories[0]
      } as Category)

      expect(component.selectedCulture).toEqual('en-US')
    })

    it('sets selected culture to first available option if no local storage', () => {
      component.availableCultures = ['en-US', 'nl-NL']
      localStorage.clear()
      component.setCategoryDocuments({
        ...MockCategories.categories[0]
      } as Category)

      expect(component.selectedCulture).toEqual('en-US')
    })
  })

  describe('parses document structure', () => {
    beforeEach(() => {
      component.selectedCulture = 'en-US'
      component.documentsBySite = MockCategories.documentsBySite.slice(0)
      component.category = {
        ...MockCategories.categories[0]
      } as Category
    })

    it('to nested tree', () => {
      const parsedDocuments = component.parseDocumentStructure()
      expect(parsedDocuments.length).toEqual(3)
      expect(parsedDocuments[0].children).toBeUndefined()
      expect(parsedDocuments[0].contentLength).toBeDefined()
      expect(parsedDocuments[1].children).toBeDefined()
      expect(parsedDocuments[1].contentLength).toBeUndefined()
      expect(parsedDocuments[2].children).toBeDefined()
      expect(parsedDocuments[2].contentLength).toBeUndefined()
    })

    it('removes prefix from name', () => {
      const parsedDocuments = component.parseDocumentStructure()
      expect(parsedDocuments[0].name).not.toContain(
        'sites/1/categories/GENERAL/en-US/'
      )
      expect(parsedDocuments[1].name).not.toContain(
        'sites/1/categories/GENERAL/en-US/'
      )
      expect(parsedDocuments[2].name).not.toContain(
        'sites/1/categories/GENERAL/en-US/'
      )
    })

    it('filters out documents with different languages', () => {
      const parsedDocuments = component.parseDocumentStructure()
      const subFolder = parsedDocuments[1].children || []
      expect(subFolder.length).toEqual(1)
    })

    it('creates a nested child document', () => {
      const parsedDocuments = component.parseDocumentStructure()
      const subFolder = parsedDocuments[1].children || []
      expect(parsedDocuments[1].name).toEqual('Operator documents')
      expect(subFolder[0]).toEqual({
        name: '10166-482-01001-EN-A Documentation guidelines.pdf',
        fullName:
          'sites/1/categories/GENERAL/en-US/Operator documents/10166-482-01001-EN-A Documentation guidelines.pdf',
        contentLength: 2551398,
        depth: 1
      })
    })

    it('creates subfolders recursively', () => {
      const parsedDocuments = component.parseDocumentStructure()
      const folderWithSubFolders = parsedDocuments[2]
      const firstSubLevel = folderWithSubFolders.children || []
      const secondSubLevel = firstSubLevel[0].children || []
      expect(folderWithSubFolders.name).toEqual('Technical documents')
      expect(firstSubLevel[0].name).toEqual('Chapter 1.3 Electrical drawings')
      expect(firstSubLevel[0].children).toBeDefined()
      expect(secondSubLevel.length).toEqual(2)
      expect(secondSubLevel[0].name).toEqual(
        '10166-431-40014EM1-EN-A EM Component Layout LCC14 PLC400.pdf'
      )
      expect(secondSubLevel[0].contentLength).toEqual(359981)
      expect(secondSubLevel[0].children).toBeUndefined()
      expect(secondSubLevel[1].name).toEqual(
        '10166-431-10016EP1-EN-B Power Layout LCC16 PLC100.pdf'
      )
      expect(secondSubLevel[1].contentLength).toEqual(321710)
      expect(secondSubLevel[1].children).toBeUndefined()
    })
  })

  it('sets search text and renders search table', async () => {
    const searchText = '100'
    component.search(searchText)

    fixture.detectChanges()
    await fixture.whenStable()

    expect(component.searchText).toEqual(searchText)
    const documentTable = fixture.debugElement.query(
      By.css('[data-testid="document-table"]')
    )
    const documentSearch = fixture.debugElement.query(
      By.css('[data-testid="document-search"]')
    )
    const documentSearchTitle = fixture.debugElement.query(
      By.css('[data-testid="documentation-category-search-title"]')
    )
    expect(documentTable).toBeFalsy()
    expect(documentSearch).toBeTruthy()
    expect(documentSearchTitle).toBeTruthy()
  })

  it('sets selected culture', () => {
    component.category = {
      ...MockCategories.categories[0]
    } as Category
    component.documentsBySite = MockCategories.documentsBySite.slice(0)
    spyOn(component, 'parseDocumentStructure').and.callThrough()

    component.onCultureChange('nl-NL')

    const parsedDocuments = component.parseDocumentStructure()
    expect(component.selectedCulture).toEqual('nl-NL')
    expect(parsedDocuments.length).toEqual(1)
    expect(parsedDocuments[0].children).toBeUndefined()
    expect(parsedDocuments[0].contentLength).toBeDefined()
  })
})
