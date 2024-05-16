import { NetworkStatus } from '@apollo/client/core'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick
} from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { By } from '@angular/platform-browser'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'

import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { AllowedDocumentationCulturesDocument } from '@core/documentation/graphql/allowed-documentation-cultures.graphql-gen'
import { SiteSettingsDocumentationComponent } from './site-settings-documentation.component'

import {
  DocumentationSettingsCategoriesDocument,
  DocumentationSettingsCategoriesGQL
} from './graphql/categories.graphql-gen'
import { DocumentationSettingsDocumentsPerCategoryGQL } from './graphql/documents-per-category.graphql-gen'
import {
  DocumentationSettingsDeleteDocumentDocument,
  DocumentationSettingsDeleteDocumentGQL
} from './graphql/mutation/deleteDocument.graphql-gen'
import { ToasterService } from '@components/toaster/toaster.service'
import { Toast } from '@components/toaster/toast/toast.model'
import { ModalModule } from '@components/modal/modal.module'

const MockedCategoriesGqlQuery = {
  categories: [
    {
      id: '0628e578-94d7-41a5-8f76-bf0a6e108590',
      codeName: 'CERTIFICATIONS',
      categoryCultures: [
        {
          name: 'Certifications',
          culture: 'en-US'
        }
      ]
    },
    {
      id: '9827d9db-a6ed-4753-a211-135620b5f1fb',
      codeName: 'OM',
      categoryCultures: [
        {
          name: 'O&M manual',
          culture: 'en-US'
        }
      ]
    }
  ]
}

const MockedCertificationsDocumentsGqlQuery = {
  documentsBySite: [
    {
      categoryCodeName: 'CERTIFICATIONS',
      name: 'sites/1/categories/CERTIFICATIONS/fr-FR/Operator documents/10166-482-01002-EN-A Documentation guidelines.pdf',
      contentLength: 2551398,
      culture: 'fr-FR'
    }
  ]
}

const MockedOMDocumentsGqlQuery = {
  documentsBySite: [
    {
      categoryCodeName: 'FULLOM',
      contentLength: 1145805988,
      culture: 'en-US',
      name: 'sites/2b1fa734-9340-440c-bc9a-047b3ec040c2/categories/FULLOM/en-US/10166-072-99999-EN-A O&M manual EN - As engineered.zip'
    },
    {
      categoryCodeName: 'FULLOM',
      contentLength: 975702815,
      culture: 'fr-FR',
      name: 'sites/2b1fa734-9340-440c-bc9a-047b3ec040c2/categories/FULLOM/fr-FR/10166-072-99999-FR-A O&M manual FR - As engineered.zip'
    }
  ]
}

const MockedTableDocuments = [
  {
    name: 'Certifications',
    documents: [
      {
        contentLength:
          MockedCertificationsDocumentsGqlQuery.documentsBySite[0]
            .contentLength,
        culture: 'Français',
        name: MockedCertificationsDocumentsGqlQuery.documentsBySite[0].name,
        isDeleting: false,
        deleted: false
      }
    ],
    documentsAmount: 1,
    isOpen: false
  },
  {
    name: 'O&M manual',
    documents: [
      {
        name: MockedOMDocumentsGqlQuery.documentsBySite[0].name,
        contentLength:
          MockedOMDocumentsGqlQuery.documentsBySite[0].contentLength,
        culture: 'English',
        isDeleting: false,
        deleted: false
      },
      {
        name: MockedOMDocumentsGqlQuery.documentsBySite[1].name,
        contentLength:
          MockedOMDocumentsGqlQuery.documentsBySite[1].contentLength,
        culture: 'Français',
        isDeleting: false,
        deleted: false
      }
    ],
    documentsAmount: 2,
    isOpen: false
  }
]

function initializeGqlCategoriesData(
  controller: ApolloTestingController,
  query: DocumentationSettingsCategoriesGQL
) {
  spyOn(query, 'fetch').and.callThrough()
  controller.expectOne(DocumentationSettingsCategoriesDocument).flushData({
    ...MockedCategoriesGqlQuery
  })

  controller.expectOne(AllowedDocumentationCulturesDocument).flushData({
    allowedDocumentationCultures: [
      { __typename: 'CultureInfo', name: 'en-US', englishName: 'English' },
      { __typename: 'CultureInfo', name: 'nl-NL', englishName: 'Dutch' },
      { __typename: 'CultureInfo', name: 'fr-FR', englishName: 'Français' }
    ]
  })

  controller.verify()
}

function mockData(categoryCodeName: string): any {
  switch (true) {
    case categoryCodeName === 'FULLOM':
      return MockedOMDocumentsGqlQuery

    default:
      return MockedCertificationsDocumentsGqlQuery
  }
}

describe('SiteSettingsDocumentationComponent', () => {
  let component: SiteSettingsDocumentationComponent
  let fixture: ComponentFixture<SiteSettingsDocumentationComponent>
  let controller: ApolloTestingController
  let documentationSettingsCategoriesQuery: DocumentationSettingsCategoriesGQL
  let documentationSettingsDocumentsPerCategoryQuery: DocumentationSettingsDocumentsPerCategoryGQL
  let mutation: DocumentationSettingsDeleteDocumentGQL
  let toastService: ToasterService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        RouterTestingModule,
        getTranslocoModule(),
        ModalModule
      ],
      declarations: [SiteSettingsDocumentationComponent],
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
    fixture = TestBed.createComponent(SiteSettingsDocumentationComponent)
    component = fixture.componentInstance
    documentationSettingsCategoriesQuery = TestBed.inject(
      DocumentationSettingsCategoriesGQL
    )
    documentationSettingsDocumentsPerCategoryQuery = TestBed.inject(
      DocumentationSettingsDocumentsPerCategoryGQL
    )
    mutation = TestBed.inject(DocumentationSettingsDeleteDocumentGQL)
    toastService = TestBed.inject(ToasterService)

    fixture.detectChanges()
  })

  it('should get categories on init', () => {
    controller = TestBed.inject(ApolloTestingController)
    initializeGqlCategoriesData(
      controller,
      documentationSettingsCategoriesQuery
    )
    component.ngOnInit()

    expect(documentationSettingsCategoriesQuery.fetch).toHaveBeenCalledWith({
      culture: 'en-US'
    })
  })

  it('should get and set documents correctly on init', fakeAsync(() => {
    controller = TestBed.inject(ApolloTestingController)
    initializeGqlCategoriesData(
      controller,
      documentationSettingsCategoriesQuery
    )

    spyOn(documentationSettingsDocumentsPerCategoryQuery, 'fetch').and.callFake(
      function () {
        const categoryCodeName = arguments[0].categoryCodeName

        return of({
          data: mockData(categoryCodeName),
          loading: false,
          networkStatus: NetworkStatus.ready
        })
      }
    )
    tick()

    expect(
      documentationSettingsDocumentsPerCategoryQuery.fetch
    ).toHaveBeenCalledTimes(2)
    expect(component.tableCategories).toEqual(MockedTableDocuments)
    expect(component.uploadCategories).toEqual([
      {
        id: MockedCategoriesGqlQuery.categories[0].codeName,
        name: MockedCategoriesGqlQuery.categories[0].categoryCultures[0].name
      },
      {
        id: MockedCategoriesGqlQuery.categories[1].codeName,
        name: MockedCategoriesGqlQuery.categories[1].categoryCultures[0].name
      }
    ])
  }))

  it('should render category table rows correctly', () => {
    component.tableCategories = JSON.parse(JSON.stringify(MockedTableDocuments))
    fixture.detectChanges()

    const tableCategoryRow = fixture.debugElement.queryAll(
      By.css('[data-testid="table-category"]')
    )

    expect(tableCategoryRow.length).toBe(2)
  })

  it('should send data to API when document is deleted', fakeAsync(() => {
    spyOn(mutation, 'mutate').and.callThrough()

    component.tableCategories = JSON.parse(JSON.stringify(MockedTableDocuments))
    component.documentToDelete = {
      categoryIndex: 0,
      index: 0,
      name: MockedTableDocuments[0].documents[0].name
    }
    component.onConfirmationClose(true)

    controller = TestBed.inject(ApolloTestingController)
    controller
      .expectOne(DocumentationSettingsDeleteDocumentDocument)
      .flushData({
        deleteDocument: true
      })
    tick()

    expect(mutation.mutate).toHaveBeenCalledWith({
      documentName: MockedTableDocuments[0].documents[0].name,
      siteId: 'testSiteId'
    })

    flush()
  }))

  it('should not delete document', fakeAsync(() => {
    spyOn(mutation, 'mutate').and.returnValue(
      of({
        networkStatus: NetworkStatus.ready,
        loading: false,
        data: {
          deleteDocument: false
        }
      })
    )
    spyOn(toastService, 'addToast').and.callThrough()

    component.tableCategories = JSON.parse(JSON.stringify(MockedTableDocuments))
    component.tableCategories[0].isOpen = true
    fixture.detectChanges()

    const tableCategory = fixture.debugElement.query(
      By.css('[data-testid="table-category"]')
    )
    tableCategory.triggerEventHandler('documentDelete', {
      index: 0,
      name: MockedTableDocuments[0].documents[0].name
    })
    fixture.detectChanges()

    component.onConfirmationClose(false)

    expect(component.tableCategories[0].documentsAmount).toBe(1)
    expect(component.tableCategories[0].isOpen).toBe(true)
    expect(component.tableCategories[0].documents![0].deleted).toBe(false)
    expect(toastService.addToast).not.toHaveBeenCalled()

    // The delete is triggered with a timeout of 300ms
    setTimeout(() => {
      expect(component.tableCategories[0].documents?.length).toBe(1)
    }, 300)

    flush()
  }))

  it('should delete document', fakeAsync(() => {
    spyOn(mutation, 'mutate').and.returnValue(
      of({
        networkStatus: NetworkStatus.ready,
        loading: false,
        data: {
          deleteDocument: true
        }
      })
    )
    spyOn(toastService, 'addToast').and.callThrough()

    component.tableCategories = JSON.parse(JSON.stringify(MockedTableDocuments))
    component.tableCategories[0].isOpen = true
    fixture.detectChanges()

    const tableCategory = fixture.debugElement.query(
      By.css('[data-testid="table-category"]')
    )
    tableCategory.triggerEventHandler('documentDelete', {
      index: 0,
      name: MockedTableDocuments[0].documents[0].name
    })
    fixture.detectChanges()

    component.onConfirmationClose(true)

    expect(component.tableCategories[0].documentsAmount).toBe(0)
    expect(component.tableCategories[0].isOpen).toBe(false)
    expect(component.tableCategories![0].documents![0].deleted).toBe(true)
    expect(toastService.addToast).toHaveBeenCalledWith(
      new Toast('success', 'File deleted.')
    )

    // The delete is triggered with a timeout of 300ms
    setTimeout(() => {
      expect(component.tableCategories[0].documents?.length).toBe(0)
    }, 300)

    flush()
  }))
})
