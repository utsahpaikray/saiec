import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser'
import { MockLocationStrategy } from '@angular/common/testing'

import { HttpClientModule } from '@angular/common/http'
import { AngularSvgIconModule } from 'angular-svg-icon'

import { NavigationItemComponent } from './navigation-item.component'
import { DynamicLinkComponent } from '@components/dynamic-link/dynamic-link.component'
import { LocationStrategy } from '@angular/common'

describe('NavigationItemComponent', () => {
  let component: NavigationItemComponent
  let fixture: ComponentFixture<NavigationItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationItemComponent, DynamicLinkComponent],
      imports: [
        AngularSvgIconModule.forRoot(),
        HttpClientModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should have correct icon', () => {
    component.url = 'contacts'
    component.icon = 'home'
    fixture.detectChanges()

    const icon = fixture.debugElement.query(By.css('[data-testid="icon"]'))

    expect(icon.componentInstance.name).toBe(component.icon)
  })

  it('should not show chevron if vertical variant', () => {
    component.url = 'test'
    fixture.detectChanges()

    let chevron = fixture.debugElement.query(By.css('[data-testid="chevron"]'))
    expect(chevron).toBeTruthy()

    component.isVertical = true
    fixture.detectChanges()

    chevron = fixture.debugElement.query(By.css('[data-testid="chevron"]'))

    expect(chevron).toBeFalsy()
  })
})
