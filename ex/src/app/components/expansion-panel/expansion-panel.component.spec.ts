import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { ExpansionPanelComponent } from './expansion-panel.component'

@Component({
  selector: 'app-expansion-panel-wrapper',
  template: `<app-expansion-panel>
    <ng-container header> Header </ng-container>
    Content
  </app-expansion-panel>`
})
export class ExpansionPanelWrapperComponent {}

describe('ExpansionPanelComponent', () => {
  let component: ExpansionPanelComponent
  let fixture: ComponentFixture<ExpansionPanelWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpansionPanelWrapperComponent, ExpansionPanelComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelWrapperComponent)
    component = fixture.debugElement.query(
      By.directive(ExpansionPanelComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open panel correctly', async () => {
    const header = fixture.debugElement.query(
      By.css('[data-testid="expansion-panel-header"]')
    )
    const content = fixture.debugElement.query(
      By.css('[data-testid="expansion-panel-content"]')
    )

    expect(content.nativeElement.classList.contains('h-none')).toEqual(true)

    header.nativeElement.click()
    await fixture.whenStable()
    fixture.detectChanges()

    expect(content.nativeElement.classList.contains('h-none')).toEqual(false)
    expect(content.nativeElement.style.height).toBeFalsy()
  })

  it('should close panel correctly', async () => {
    const header = fixture.debugElement.query(
      By.css('[data-testid="expansion-panel-header"]')
    )
    const content = fixture.debugElement.query(
      By.css('[data-testid="expansion-panel-content"]')
    )

    component.isOpen = true
    fixture.detectChanges()

    expect(content.nativeElement.classList.contains('h-none')).toEqual(false)
    expect(content.nativeElement.style.height).toBeFalsy()

    header.nativeElement.click()
    await fixture.whenStable()
    fixture.detectChanges()

    expect(content.nativeElement.classList.contains('h-none')).toEqual(true)
  })
})
