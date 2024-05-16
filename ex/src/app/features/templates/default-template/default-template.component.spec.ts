import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthModule, LogLevel } from 'angular-auth-oidc-client'
import { Observable } from 'rxjs'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { CurrentUserServiceMock } from '@core/current-user/current-user.service.mock'

import { DefaultTemplateComponent } from './default-template.component'

describe('DefaultTemplateComponent', () => {
  let component: DefaultTemplateComponent
  let fixture: ComponentFixture<DefaultTemplateComponent>
  let observable: Observable<boolean>
  let currentUserService: CurrentUserService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultTemplateComponent],
      imports: [
        RouterTestingModule,
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
        {
          provide: CurrentUserService,
          useClass: CurrentUserServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    currentUserService = TestBed.inject(CurrentUserService)
  })

  it('should have correct head with banner set', () => {
    component.hasBanner = true
    fixture.detectChanges()

    const defaultTemplateHeadSection = fixture.debugElement.query(
      By.css('[data-testid="default-template-head-section"]')
    )
    const defaultTemplateHeadSectionInner = fixture.debugElement.query(
      By.css('[data-testid="default-template-head-section-inner"]')
    )

    expect(defaultTemplateHeadSection.nativeElement.classList.value).toBe('')
    expect(defaultTemplateHeadSectionInner.nativeElement.classList.value).toBe(
      ''
    )
  })

  it('should have correct head without banner set', () => {
    const defaultTemplateHeadSection = fixture.debugElement.query(
      By.css('[data-testid="default-template-head-section"]')
    )
    const defaultTemplateHeadSectionInner = fixture.debugElement.query(
      By.css('[data-testid="default-template-head-section-inner"]')
    )

    expect(defaultTemplateHeadSection.nativeElement.classList.value).toBe(
      'px-m py-2-xl has-banner md:px-4-xl'
    )
    expect(defaultTemplateHeadSectionInner.nativeElement.classList.value).toBe(
      'mx-auto max-w-screen-2xl'
    )
  })
})
