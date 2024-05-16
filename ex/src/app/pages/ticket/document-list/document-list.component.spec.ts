import { HttpClientModule } from '@angular/common/http'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { File, WebLink } from '@core/generated/types'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import {
  MaximoUserApiKeyDocument,
  MaximoUserApiKeyGQL
} from '../graphql/maximo-user-api-key.graphql-gen'

import { DocumentListComponent } from './document-list.component'

const mockTicketFiles = [
  {
    description: 'pdf file',
    name: 'fileName',
    key: {
      number: 'TEST PDF ATTCH',
      __typename: 'DocumentKey'
    },
    url: `http://localhost:9876/assets/logo.svg`,
    __typename: 'File'
  },
  {
    description: 'excel  file',
    name: 'fileName',
    key: {
      number: 'TEST XLS',
      __typename: 'DocumentKey'
    },
    url: `http://localhost:9876/assets/logo.svg`,
    __typename: 'File'
  }
] as File[]

const mockTicketWebLinks = [
  {
    description: 'yahoo',
    name: 'fileName',
    key: {
      number: 'Test weblink A',
      __typename: 'DocumentKey'
    },
    url: 'https://www.yahoo.com/',
    __typename: 'WebLink'
  },
  {
    description: 'google',
    name: 'fileName',
    key: {
      number: 'Test weblink B',
      __typename: 'DocumentKey'
    },
    url: 'https://www.google.com/',
    __typename: 'WebLink'
  }
] as WebLink[]

describe('DocumentListComponent', () => {
  let component: DocumentListComponent
  let fixture: ComponentFixture<DocumentListComponent>
  let controller: ApolloTestingController
  let maximoUserApiKeyQuery: MaximoUserApiKeyGQL

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentListComponent, HttpClientModule, ApolloTestingModule],
      teardown: { destroyAfterEach: false },
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(DocumentListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    controller = TestBed.inject(ApolloTestingController)
    maximoUserApiKeyQuery = TestBed.inject(MaximoUserApiKeyGQL)
  })

  it('document info is shown correctly', () => {
    component.documents = mockTicketFiles
    fixture.detectChanges()

    const documentRow = fixture.debugElement.queryAll(
      By.css('[data-testid^="document-row"]')
    )
    expect(documentRow.length).toBe(2)
    expect(
      documentRow[0].nativeElement.classList.contains('cursor-pointer')
    ).toEqual(true)

    const documentNames = fixture.debugElement.queryAll(
      By.css('[data-testid="document-name"]')
    )
    expect(documentNames[0].nativeElement.textContent.trim()).toBe(
      mockTicketFiles[0].name
    )

    const documentDescriptions = fixture.debugElement.queryAll(
      By.css('[data-testid="document-description"]')
    )
    expect(documentDescriptions[0].nativeElement.textContent).toBe(
      mockTicketFiles[0].description
    )

    const documentIcons = fixture.debugElement.queryAll(
      By.css('[data-testid="document-icon"]')
    )
    expect(documentIcons[0].nativeElement.key).toBe('download')
  })

  it('show correct icon for document weblink', () => {
    component.documents = mockTicketWebLinks
    fixture.detectChanges()

    const documentIcons = fixture.debugElement.queryAll(
      By.css('[data-testid="document-icon"]')
    )
    expect(documentIcons[0].nativeElement.key).toBe('link-external')
  })

  it('name and description are not clickable, icon is disabled with no document url', () => {
    component.documents = [{ ...mockTicketFiles[0], url: '' }]
    fixture.detectChanges()

    const documentRow = fixture.debugElement.queryAll(
      By.css('[data-testid^="document-row"]')
    )
    expect(
      documentRow[0].nativeElement.classList.contains('cursor-pointer')
    ).toEqual(false)

    const iconButton = documentRow[0].children[0].children[1].nativeElement
    expect(iconButton.disabled).toBe(true)
  })

  describe('show more button', () => {
    it('button is shown when there are more documents to show', async () => {
      component.documents = mockTicketWebLinks
      component.hasMoreDocuments = true
      fixture.detectChanges()

      const showMoreButton = fixture.debugElement.query(
        By.css(`[data-testid="show-more"]`)
      )
      expect(showMoreButton).toBeTruthy()
    })

    it('button is shown when there is more to load', () => {
      component.documents = mockTicketFiles
      component.isLoadingMore = true
      fixture.detectChanges()

      const showMoreButton = fixture.debugElement.query(
        By.css(`[data-testid="show-more"]`)
      )
      expect(showMoreButton).toBeTruthy()
    })

    it('button is not shown when no more documents to show', () => {
      component.documents = mockTicketWebLinks
      component.hasMoreDocuments = false
      fixture.detectChanges()

      const showMoreButton = fixture.debugElement.query(
        By.css(`[data-testid="show-more"]`)
      )
      expect(showMoreButton).toBeFalsy()
    })

    it('button is not shown when there is no more to load', () => {
      component.documents = mockTicketFiles
      component.isLoadingMore = false
      fixture.detectChanges()

      const showMoreButton = fixture.debugElement.query(
        By.css(`[data-testid="show-more"]`)
      )
      expect(showMoreButton).toBeFalsy()
    })

    it('button is disabled when there is more to load', () => {
      component.documents = mockTicketFiles
      component.isLoadingMore = true
      fixture.detectChanges()

      const showMoreButton = fixture.debugElement.query(
        By.css(`[data-testid="show-more"]`)
      )
      expect(showMoreButton.nativeElement.disabled).toBe(true)
    })

    it('button click trigger event handler', async () => {
      spyOn(component.showMoreEvent, 'emit')
      component.documents = mockTicketFiles
      component.isLoadingMore = true
      fixture.detectChanges()

      const showMoreButton = fixture.debugElement.query(
        By.css(`[data-testid="show-more"]`)
      )
      showMoreButton.triggerEventHandler('click', null)
      fixture.detectChanges()
      await fixture.whenStable()
      expect(component.showMoreEvent.emit).toHaveBeenCalled()
    })
  })

  describe('on document click', () => {
    it('download file works', () => {
      spyOn(component, 'download').and.callThrough()
      spyOn(maximoUserApiKeyQuery, 'fetch').and.callThrough()

      component.documents = mockTicketFiles
      fixture.detectChanges()
      component.onDocumentClick(mockTicketFiles[0])
      fixture.detectChanges()

      const op = controller.expectOne(MaximoUserApiKeyDocument)
      expect(op.operation.operationName).toEqual('maximoUserApiKey')

      op.flushData({
        maximoUserApiKey: 'v8n7cuhg73dr5lqasj6iivmdasvl7c1vvseqlv5b'
      })
      controller.verify()
      fixture.detectChanges()

      const keyNumber = mockTicketFiles[0].key?.number as string

      expect(component.download).toHaveBeenCalledOnceWith(
        mockTicketFiles[0].url,
        keyNumber
      )
      expect(maximoUserApiKeyQuery.fetch).toHaveBeenCalledTimes(1)
    })

    it('open web link works', () => {
      spyOn(window, 'open')

      component.documents = mockTicketWebLinks
      fixture.detectChanges()
      component.onDocumentClick(mockTicketWebLinks[0])
      fixture.detectChanges()

      expect(window.open).toHaveBeenCalledOnceWith(
        mockTicketWebLinks[0].url,
        '_blank'
      )
    })
  })
})
