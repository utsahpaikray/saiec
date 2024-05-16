import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { By } from '@angular/platform-browser'
import {
  ApolloTestingModule,
  ApolloTestingController
} from 'apollo-angular/testing'
import { of } from 'rxjs'

import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { DocumentationOverviewComponent } from './documentation-overview.component'
import {
  DocumentCategoriesDocument,
  DocumentCategoriesGQL
} from './graphql/document-categories.graphql-gen'

const MockCategories = {
  categories: [
    {
      id: 'e168b0fb-1eb8-4225-aeca-8ea6fa26ed07',
      codeName: 'GENERAL',
      categoryCultures: [
        {
          name: 'General',
          culture: 'en-US',
          description: 'General Documentation'
        }
      ],
      categoryAccesses: [{ roleReference: 'admin' }, { roleReference: 'user' }]
    },
    {
      id: '5e3dee83-2e43-4349-a0b1-4a48433d1e14',
      codeName: 'MANUALS',
      categoryCultures: [
        {
          name: 'Manuals',
          culture: 'en-US',
          description: 'Manuals Documentation'
        }
      ],
      categoryAccesses: [{ roleReference: 'admin' }, { roleReference: 'user' }]
    }
  ],
  categoriesBySite: ['GENERAL', 'MANUALS']
}

function initializeDocumentCategoriesData(
  controller: ApolloTestingController,
  query: DocumentCategoriesGQL
) {
  spyOn(query, 'watch').and.callThrough()
  const documentCategoriesOp = controller.expectOne(DocumentCategoriesDocument)
  expect(documentCategoriesOp.operation.operationName).toEqual(
    'documentCategories'
  )

  documentCategoriesOp.flush({
    data: { ...MockCategories }
  })
}

describe('DocumentationOverviewComponent', () => {
  let component: DocumentationOverviewComponent
  let fixture: ComponentFixture<DocumentationOverviewComponent>
  let controller: ApolloTestingController
  let documentCategoriesQuery: DocumentCategoriesGQL

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, getTranslocoModule()],
      declarations: [DocumentationOverviewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              siteId: 'testSiteId'
            })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    documentCategoriesQuery = TestBed.inject(DocumentCategoriesGQL)
  })

  it('gets correct data on init', () => {
    controller = TestBed.inject(ApolloTestingController)
    initializeDocumentCategoriesData(controller, documentCategoriesQuery)
    controller.verify()
    component.ngOnInit()

    expect(documentCategoriesQuery.watch).toHaveBeenCalledWith(
      {
        culture: 'en-US',
        siteId: component.siteId
      },
      { useInitialLoading: true, fetchPolicy: 'no-cache' }
    )
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

  it('show loading spinner', async () => {
    component.loading = true
    fixture.detectChanges()
    await fixture.whenStable()

    const loadingSpinner = fixture.debugElement.query(
      By.css('[data-testid="documentation-overview-spinner"]')
    )
    expect(loadingSpinner).toBeTruthy()
  })

  it('do not show loading spinner', async () => {
    component.loading = false
    fixture.detectChanges()
    await fixture.whenStable()

    const loadingSpinner = fixture.debugElement.query(
      By.css('[data-testid="documentation-overview-spinner"]')
    )
    expect(loadingSpinner).toBeFalsy()
  })
})
