import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { CardComponent } from './card.component'

@Component({
  selector: 'app-card-wrapper',
  template: ` <app-card> Card content </app-card>`
})
export class CardWrapperComponent {}

describe('CardComponent', () => {
  let wrapper: CardWrapperComponent
  let component: CardComponent
  let fixture: ComponentFixture<CardWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardWrapperComponent, CardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWrapperComponent)
    wrapper = fixture.componentInstance
    component = fixture.debugElement.query(
      By.directive(CardComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should project correctly the data on card slot', () => {
    const card = fixture.debugElement.query(By.css('[data-testid="card"]'))
    expect(card.nativeElement.textContent.trim()).toBe('Card content')
  })
})
