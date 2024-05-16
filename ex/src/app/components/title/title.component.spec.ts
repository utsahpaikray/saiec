import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { TitleComponent } from './title.component'

describe('TitleComponent', () => {
  let component: TitleComponent
  let fixture: ComponentFixture<TitleComponent>
  let title: DebugElement
  let text = 'This is a title'

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent)
    component = fixture.componentInstance
    component.text = text
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it(`should have as text '${text}'`, () => {
    expect(component.text).toEqual(text)
  })

  it(`should render as title '${text}'`, () => {
    title = fixture.debugElement.query(By.css('[data-testid="title"]'))
    fixture.detectChanges()

    expect(title.nativeElement.textContent).toContain(text)
  })
})
