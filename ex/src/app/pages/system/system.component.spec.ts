/*
// @TODO: Fix this test after Gravity is fully utilized. Currently it causes IconProvider failing to register icons.
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { SystemComponent } from './system.component'
import { StoreModule } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { AuthModule, LogLevel, OidcSecurityService } from 'angular-auth-oidc-client'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { SitesService } from '@core/sites/sites.service'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { AccessTokenService } from '@core/auth/access-token.service'

xdescribe('SystemComponent', () => {
  let component: SystemComponent
  let fixture: ComponentFixture<SystemComponent>
  let service: SitesService
  let currentUserService: CurrentUserService
  let oidcSecurityService: OidcSecurityService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        StoreModule.forRoot({}),
        ApolloTestingModule,
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
      declarations: [SystemComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              siteId: 'testSiteId'
            }),
            snapshot: { firstChild: { url: 'http://localhost:5000' } }
          }
        },
        {
          provide: AccessTokenService,
          useClass: class {
            public async init(): Promise<void> { return Promise.resolve() }
          
            public getAccessToken(): string {
              return ''
            }
          
            public hasAccessToken(): boolean {
              return true
            }
          }
        }
      ],
      schemas: []
    }).compileComponents()

    fixture = TestBed.createComponent(SystemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    service = TestBed.inject(SitesService)
    currentUserService = TestBed.inject(CurrentUserService)
    oidcSecurityService = TestBed.inject(OidcSecurityService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
*/
