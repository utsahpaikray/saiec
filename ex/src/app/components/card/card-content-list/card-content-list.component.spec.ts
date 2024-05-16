import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { CardContentListComponent } from './card-content-list.component'

@Component({
  selector: 'app-card-content-list-wrapper',
  template: ` <app-card-content-list>
    Card content list content
  </app-card-content-list>`
})
export class CardContentListWrapperComponent {}

describe('CardContentListComponent', () => {
  let wrapper: CardContentListWrapperComponent
  let component: CardContentListComponent
  let fixture: ComponentFixture<CardContentListWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardContentListWrapperComponent, CardContentListComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContentListWrapperComponent)
    wrapper = fixture.componentInstance
    component = fixture.debugElement.query(
      By.directive(CardContentListComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should project correctly the data on the slot', () => {
    const cardContentList = fixture.debugElement.query(
      By.css('[data-testid="card-content-list"]')
    )
    expect(cardContentList.nativeElement.textContent.trim()).toBe(
      'Card content list content'
    )
  })
})
