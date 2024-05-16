import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { SectionAsideRightComponent } from './section-aside-right.component'

@Component({
  selector: 'app-section-aside-right-wrapper',
  template: ` <app-section-aside-right>
    Content column
    <ng-container aside> Sidebar column </ng-container>
  </app-section-aside-right>`
})
export class SectionAsideRightWrapperComponent {}

describe('SectionAsideRightComponent', () => {
  let wrapper: SectionAsideRightWrapperComponent
  let component: SectionAsideRightComponent
  let fixture: ComponentFixture<SectionAsideRightWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SectionAsideRightWrapperComponent,
        SectionAsideRightComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAsideRightWrapperComponent)
    wrapper = fixture.componentInstance
    component = fixture.debugElement.query(
      By.directive(SectionAsideRightComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should project correctly the data on the content column slot', () => {
    const contentColumn = fixture.debugElement.query(
      By.css('[data-testid="section-aside-right-content"]')
    )
    expect(contentColumn.nativeElement.textContent.trim()).toBe(
      'Content column'
    )
  })

  it('should project correctly the data on the aside column slot', () => {
    const sidebarColumn = fixture.debugElement.query(
      By.css('[data-testid="section-aside-right-sidebar"]')
    )
    expect(sidebarColumn.nativeElement.textContent.trim()).toBe(
      'Sidebar column'
    )
  })
})
