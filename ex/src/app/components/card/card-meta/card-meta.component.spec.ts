import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { CardMetaComponent } from './card-meta.component'
@Component({
  selector: 'app-card-meta-wrapper',
  template: ` <app-card-meta>
    <ng-container label> Label </ng-container>
    Info
  </app-card-meta>`
})
export class CardMetaWrapperComponent {}

describe('CardMetaComponent', () => {
  let wrapper: CardMetaWrapperComponent
  let component: CardMetaComponent
  let fixture: ComponentFixture<CardMetaWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardMetaWrapperComponent, CardMetaComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMetaWrapperComponent)
    wrapper = fixture.componentInstance
    component = fixture.debugElement.query(
      By.directive(CardMetaComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should project correctly the data on the label slot', () => {
    const label = fixture.debugElement.query(
      By.css('[data-testid="card-meta-label"]')
    )
    expect(label.nativeElement.textContent.trim()).toBe('Label')
  })

  it('should project correctly the data on the info slot', () => {
    const info = fixture.debugElement.query(
      By.css('[data-testid="card-meta-info"]')
    )
    expect(info.nativeElement.textContent.trim()).toBe('Info')
  })
})
