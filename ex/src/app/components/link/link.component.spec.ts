import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'

import { LinkComponent } from './link.component'

describe('LinkComponent', () => {
  let component: LinkComponent
  let fixture: ComponentFixture<LinkComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [LinkComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should render icon correctly', () => {
    component.iconPosition = 'left'
    component.iconName = 'mail'
    fixture.detectChanges()

    const iconLeft = fixture.debugElement.query(
      By.css('[data-testid="link-icon-left"]')
    )
    const iconRight = fixture.debugElement.query(
      By.css('[data-testid="link-icon-right"]')
    )
    expect(iconLeft).toBeTruthy()
    expect(iconRight).toBeFalsy()
  })

  it('should tell dynamic link to open url in a new tab', () => {
    component.hasLinkTargetBlank = true
    fixture.detectChanges()

    const dynamicLink = fixture.debugElement.query(By.css('app-dynamic-link'))
    expect(dynamicLink.componentInstance.hasLinkTargetBlank).toBe(true)
  })
})
