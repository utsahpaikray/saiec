import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { AssertiveTextComponent } from '../assertive-text/assertive-text.component'
import { DatalistItem } from './datalist-item.model'

import { DatalistComponent } from './datalist.component'

describe('DatalistComponent', () => {
  let component: DatalistComponent
  let fixture: ComponentFixture<DatalistComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, AssertiveTextComponent],
      declarations: [DatalistComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DatalistComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should show info text', () => {
    component.infoText = 'info text'
    fixture.detectChanges()

    const infoText = fixture.debugElement.query(
      By.css('[data-testid="info-text"]')
    )
    expect(infoText).toBeTruthy()
  })

  it('should open the datalist', () => {
    component.isOpen = false

    const input = fixture.debugElement.query(
      By.css('[data-testid="datalist-input"]')
    )
    input.nativeElement.click()

    expect(component.isOpen).toBe(true)
  })

  it('should close the datalist if already open', () => {
    component.isOpen = true

    const input = fixture.debugElement.query(
      By.css('[data-testid="datalist-input"]')
    )
    input.nativeElement.click()

    expect(component.isOpen).toBe(false)
  })

  it('should not open the datalist if disabled', () => {
    component.isOpen = false
    component.isDisabled = true

    const input = fixture.debugElement.query(
      By.css('[data-testid="datalist-input"]')
    )
    input.nativeElement.click()

    expect(component.isOpen).toBe(false)
  })

  describe('reset button', () => {
    describe('without filtered value', () => {
      it('should not be visible', () => {
        const clearButton = fixture.debugElement.query(
          By.css('[data-testid="datalist-clear-button"]')
        )

        expect(clearButton).toBeFalsy()
      })
    })

    describe('with filtered value', () => {
      beforeEach(() => {
        component.filterValue = 'A'
      })

      it('should not be visible if input is not focused', () => {
        const clearButton = fixture.debugElement.query(
          By.css('[data-testid="datalist-clear-button"]')
        )

        expect(clearButton).toBeFalsy()
      })

      it('should be visible if input is focused & clear filtered value', () => {
        component.focused = true
        fixture.detectChanges()

        const clearButton = fixture.debugElement.query(
          By.css('[data-testid="datalist-clear-button"]')
        )

        expect(clearButton).toBeTruthy()

        const clearIcon = fixture.debugElement.query(
          By.css('[data-testid="datalist-clear-icon"]')
        )
        clearIcon.nativeElement.click()

        expect(component.filterValue).toBe('')
      })

      it('should clear filtered value & keep datalist open if it was already open', () => {
        component.isOpen = true
        component.isDisabled = false
        component.focused = true

        fixture.detectChanges()

        const clearIconBtn = fixture.debugElement.query(
          By.css('[data-testid="datalist-clear-button"]')
        )
        clearIconBtn.nativeElement.click()

        expect(component.filterValue).toBe('')
        expect(component.isOpen).toBe(true)
      })
    })
  })

  it('renders the list correctly', async () => {
    component.items = [
      new DatalistItem('1', 'Schipol'),
      new DatalistItem('2', 'Amazon'),
      new DatalistItem('3', 'British Airways'),
      new DatalistItem('4', 'DHL'),
      new DatalistItem('5', 'Schneider'),
      new DatalistItem('6', 'TWA')
    ]
    component.ngOnChanges({ items: {} as SimpleChange })
    fixture.detectChanges()

    await fixture.whenStable()
    const list = fixture.debugElement.query(
      By.css('[data-testid="datalist-list"]')
    )
    expect(list.children.length).toEqual(component.items.length)
    expect(list.children[0].nativeElement.textContent.trim()).toEqual('Schipol')
  })

  it('sets filtered value when selecting an item', async () => {
    spyOn(component.changeEvent, 'emit').and.callThrough()
    component.items = [
      new DatalistItem('1', 'Schipol'),
      new DatalistItem('2', 'Amazon'),
      new DatalistItem('3', 'British Airways'),
      new DatalistItem('4', 'DHL'),
      new DatalistItem('5', 'Schneider'),
      new DatalistItem('6', 'TWA')
    ]
    component.ngOnChanges({ items: {} as SimpleChange })
    fixture.detectChanges()

    await fixture.whenStable()
    const listItem = fixture.debugElement.query(
      By.css('[data-testid="datalist-item-1"]')
    )
    listItem.children[0].nativeElement.click()
    expect(component.filterValue).toEqual('Schipol')
    expect(component.changeEvent.emit).toHaveBeenCalledWith(
      new DatalistItem('1', 'Schipol')
    )
  })

  it('filters on input', async () => {
    component.items = [
      new DatalistItem('1', 'Schipol'),
      new DatalistItem('2', 'Amazon'),
      new DatalistItem('3', 'British Airways'),
      new DatalistItem('4', 'DHL'),
      new DatalistItem('5', 'Schneider'),
      new DatalistItem('6', 'TWA')
    ]
    component.filterValue = 'A'
    fixture.detectChanges()

    await fixture.whenStable()
    const input = fixture.debugElement.query(
      By.css('[data-testid="datalist-input"]')
    )
    input.triggerEventHandler('input', { target: input.nativeElement })
    expect(component.filteredItems.length).toEqual(3)
  })

  it('selects an item on input if text is equal to item', async () => {
    spyOn(component.changeEvent, 'emit').and.callThrough()
    component.items = [
      new DatalistItem('1', 'Schipol'),
      new DatalistItem('2', 'Amazon'),
      new DatalistItem('3', 'British Airways'),
      new DatalistItem('4', 'DHL'),
      new DatalistItem('5', 'Schneider'),
      new DatalistItem('6', 'TWA')
    ]
    component.filterValue = 'Schipol'
    fixture.detectChanges()

    await fixture.whenStable()
    const input = fixture.debugElement.query(
      By.css('[data-testid="datalist-input"]')
    )
    input.triggerEventHandler('input', { target: input.nativeElement })
    expect(component.filteredItems.length).toEqual(1)
    expect(component.value).toEqual('1')
    expect(component.selectedItem).toEqual(new DatalistItem('1', 'Schipol'))
    expect(component.changeEvent.emit).toHaveBeenCalledOnceWith(
      new DatalistItem('1', 'Schipol')
    )
  })

  it('deselects on input if input does not match an item', async () => {
    spyOn(component.changeEvent, 'emit').and.callThrough()
    component.items = [
      new DatalistItem('1', 'Schipol'),
      new DatalistItem('2', 'Amazon'),
      new DatalistItem('3', 'British Airways'),
      new DatalistItem('4', 'DHL'),
      new DatalistItem('5', 'Schneider'),
      new DatalistItem('6', 'TWA')
    ]
    component.filterValue = 'Schipo'
    fixture.detectChanges()

    await fixture.whenStable()
    const input = fixture.debugElement.query(
      By.css('[data-testid="datalist-input"]')
    )
    input.triggerEventHandler('input', { target: input.nativeElement })
    expect(component.filteredItems.length).toEqual(1)
    expect(component.value).toEqual(null)
    expect(component.selectedItem).toEqual(null)
    expect(component.changeEvent.emit).toHaveBeenCalledOnceWith(null)
  })

  it('Sets correct values if selectedValue is passed as input', async () => {
    component.items = [
      new DatalistItem('1', 'Schipol'),
      new DatalistItem('2', 'Amazon'),
      new DatalistItem('3', 'British Airways'),
      new DatalistItem('4', 'DHL'),
      new DatalistItem('5', 'Schneider'),
      new DatalistItem('6', 'TWA')
    ]
    component.value = '1'
    component.ngOnChanges({ items: {} as SimpleChange })
    fixture.detectChanges()

    await fixture.whenStable()
    const input = fixture.debugElement.query(
      By.css('[data-testid="datalist-input"]')
    )
    expect(input.nativeElement.value).toEqual('Schipol')
    expect(component.filterValue).toEqual('Schipol')
    expect(component.selectedItem).toEqual(new DatalistItem('1', 'Schipol'))
    expect(component.filteredItems.length).toEqual(1)
  })
})
