import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import {
  AuthModule,
  LogLevel,
  OidcSecurityService
} from 'angular-auth-oidc-client'
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing'
import { filter, of } from 'rxjs'
import {
  GenericTermsAndConditionsFragment,
  TermsAndConditionsDocument,
  TermsAndConditionsGQL
} from './graphql/cms-terms-and-conditions.graphql-gen'
import { TermsAndConditionsComponent } from './terms-and-conditions.component'

const mockGenericTermsAndConditionsPage: GenericTermsAndConditionsFragment[] = [
  {
    title: 'title',
    contentSection: {
      json: {
        content: [],
        data: {},
        nodeType: 'document'
      }
    },
    __typename: 'Generic'
  }
]

function initializePageData(
  controller: ApolloTestingController,
  query: TermsAndConditionsGQL
) {
  const op = controller.expectOne(TermsAndConditionsDocument)
  expect(op.operation.operationName).toEqual('termsAndConditions')

  op.flush({
    data: {
      genericCollection: { items: mockGenericTermsAndConditionsPage.slice(0) }
    }
  })

  controller.verify()
}

const mockCurrentUserStore = {
  currentUserFeature: {
    isAuthenticated: true
  }
}

describe('TermsAndConditionsComponent', () => {
  let component: TermsAndConditionsComponent
  let fixture: ComponentFixture<TermsAndConditionsComponent>
  let controller: ApolloTestingController
  let oidcSecurityService: OidcSecurityService
  let termsAndConditionsQuery: TermsAndConditionsGQL
  let store: Store

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsAndConditionsComponent],
      imports: [
        ApolloTestingModule.withClients(['cms']),
        RouterTestingModule,
        getTranslocoModule(),
        AuthModule.forRoot({
          config: {
            authority: 'https://keycloak-dev.evimvi.nl/auth/realms/dsf',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'portal-app',
            scope: 'openid offline_access',
            responseType: 'code',
            autoUserInfo: true,
            silentRenew: true,
            useRefreshToken: true,
            logLevel: LogLevel.Debug,
            ignoreNonceAfterRefresh: true
          }
        })
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: 'selectIsAuthenticated',
              value: mockCurrentUserStore.currentUserFeature.isAuthenticated
            }
          ]
        })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditionsComponent)
    component = fixture.componentInstance
    controller = TestBed.inject(ApolloTestingController)
    oidcSecurityService = TestBed.inject(OidcSecurityService)
    termsAndConditionsQuery = TestBed.inject(TermsAndConditionsGQL)
    store = TestBed.inject(MockStore)
    fixture.detectChanges()

    initializePageData(controller, termsAndConditionsQuery)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch correct data', () => {
    const mockResult = {
      data: {
        genericCollection: {
          items: mockGenericTermsAndConditionsPage
        }
      },
      loading: false,
      networkStatus: 7
    }
    spyOn(termsAndConditionsQuery, 'fetch').and.returnValue(of(mockResult))
    component.genericTermsAndConditions$
      .pipe(
        filter(
          (result): result is GenericTermsAndConditionsFragment[] => !!result
        )
      )
      .subscribe((result) => {
        expect(result.length).toBeGreaterThan(0)
        expect(result[0].title).toEqual('title')
      })
  })

  it('should not show page title and rich text if data does not exist', async () => {
    component.genericTermsAndConditions$ = of(null)

    fixture.detectChanges()
    await fixture.whenStable()

    const pageTitle = fixture.debugElement.query(
      By.css('[data-testid="terms-and-conditions-title"]')
    )
    const richText = fixture.debugElement.query(
      By.css('[data-testid="terms-and-conditions-rich-text"]')
    )

    expect(pageTitle).toBeFalsy()
    expect(richText).toBeFalsy()
  })

  it('should show page title and rich text if any', async () => {
    component.genericTermsAndConditions$ = of(mockGenericTermsAndConditionsPage)

    fixture.detectChanges()
    await fixture.whenStable()

    const pageTitle = fixture.debugElement.query(
      By.css('[data-testid="terms-and-conditions-title"]')
    )
    const richText = fixture.debugElement.query(
      By.css('[data-testid="terms-and-conditions-rich-text"]')
    )

    expect(pageTitle).toBeTruthy()
    expect(richText).toBeTruthy()
  })

  it('should not show footer if authenticated', async () => {
    component.isFooterVisible$ = of(false)
    fixture.detectChanges()
    await fixture.whenStable()

    const footer = fixture.debugElement.query(
      By.css('[data-testid="terms-and-conditions-footer"]')
    )
    expect(footer).toBeFalsy()
  })

  it('should show footer if not authenticated', () => {
    component.isFooterVisible$ = of(true)
    fixture.detectChanges()
    fixture.whenStable()

    const footer = fixture.debugElement.query(
      By.css('[data-testid="terms-and-conditions-footer"]')
    )
    expect(footer).toBeTruthy()
  })
})
