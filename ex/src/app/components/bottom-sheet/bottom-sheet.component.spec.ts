import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { BottomSheetComponent } from './bottom-sheet.component'
import { ExpansionPanelComponent } from '@components/expansion-panel/expansion-panel.component'
import { HttpClientModule } from '@angular/common/http'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('BottomSheetComponent', () => {
  let component: BottomSheetComponent
  let fixture: ComponentFixture<BottomSheetComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomSheetComponent, ExpansionPanelComponent],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should not render the header', () => {
    const header = fixture.debugElement.query(
      By.css('[data-testid="bottom-sheet-header"]')
    )

    expect(header).toBeFalsy()
  })

  it('should render the header with correct title', () => {
    component.title = 'Test title'
    fixture.detectChanges()

    const header = fixture.debugElement.query(
      By.css('[data-testid="bottom-sheet-header"]')
    )
    const title = fixture.debugElement.query(
      By.css('[data-testid="bottom-sheet-title"]')
    )

    expect(header).toBeTruthy()
    expect(title.nativeElement.textContent.trim()).toEqual(component.title)
  })

  it('should trigger the close event', () => {
    spyOn(component.closeEvent, 'emit').and.callThrough()

    component.title = 'Test title'
    fixture.detectChanges()

    const close = fixture.debugElement.query(
      By.css('[data-testid="bottom-sheet-close"]')
    )
    close.triggerEventHandler('click', {
      target: close.nativeElement
    })
    fixture.detectChanges()

    expect(component.closeEvent.emit).toHaveBeenCalled()
  })

  it('should collapse the expansion panel', () => {
    component.title = 'Test title'
    fixture.detectChanges()

    const expansionPanel = fixture.debugElement.query(
      By.css('app-expansion-panel')
    )

    expect(expansionPanel.componentInstance.isOpen).toBeTrue()
    expect(component.isExpanded).toBeTrue()

    const expand = fixture.debugElement.query(
      By.css('[data-testid="bottom-sheet-expand"]')
    )
    expand.triggerEventHandler('click', {
      target: expand.nativeElement
    })
    fixture.detectChanges()

    expect(expansionPanel.componentInstance.isOpen).toBeFalse()
    expect(component.isExpanded).toBeFalse()
  })
})
