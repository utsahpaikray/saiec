import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SiteSwitcherComponent } from './site-switcher.component'
import { RouterTestingModule } from '@angular/router/testing'
import { Roles } from '@core/interfaces/roles.enum'
import { UserData } from '@core/interfaces/user-data.interface'
import { Site, IdentityUser, Portal } from '@core/generated/types'
import { Router } from '@angular/router'

describe('SiteSwitcherComponent', () => {
  let component: SiteSwitcherComponent
  let fixture: ComponentFixture<SiteSwitcherComponent>
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteSwitcherComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSwitcherComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    router = TestBed.inject(Router)
  })

  it('navigates on site select', () => {
    spyOn(router, 'navigate')
    component.onSiteSelect('site123')

    expect(router.navigate).toHaveBeenCalledOnceWith(['/sites/site123'])
  })
})
