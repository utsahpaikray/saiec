import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

import { NoPortalsSitesComponent } from './no-portals-sites.component'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

describe('NoPortalsSitesComponent', () => {
  let component: NoPortalsSitesComponent
  let fixture: ComponentFixture<NoPortalsSitesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoPortalsSitesComponent],
      imports: [getTranslocoModule()],
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
    fixture = TestBed.createComponent(NoPortalsSitesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
