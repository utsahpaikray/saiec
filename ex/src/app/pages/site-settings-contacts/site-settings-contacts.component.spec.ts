import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { ApolloTestingModule } from 'apollo-angular/testing'
import { of } from 'rxjs'

import { CurrentUserService } from '@core/current-user/current-user.service'
import { CurrentUserServiceMock } from '@core/current-user/current-user.service.mock'
import { SitesService } from '@core/sites/sites.service'
import { SitesServiceMock } from '@core/sites/sites.service.mock'

import { TextAreaComponent } from '@components/text-area/text-area.component'
import { SiteSettingsContactsComponent } from './site-settings-contacts.component'
import { SiteSettingsContactsService } from './site-settings-contacts.service'

describe('SiteSettingsContactsComponent', () => {
  let component: SiteSettingsContactsComponent
  let fixture: ComponentFixture<SiteSettingsContactsComponent>
  const siteId = 'siteId'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteSettingsContactsComponent, TextAreaComponent],
      imports: [
        RouterTestingModule,
        ApolloTestingModule,
        getTranslocoModule(),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        SiteSettingsContactsService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              siteId
            }),
            snapshot: new ActivatedRouteSnapshot()
          }
        },
        {
          provide: CurrentUserService,
          useClass: CurrentUserServiceMock
        },
        {
          provide: SitesService,
          useClass: SitesServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSettingsContactsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  // TODO - add the unit test once this component and its service are refactored
})
