import { Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'
import { TabComponent } from '../tab/tab.component'

import { TabGroupComponent } from './tab-group.component'

@Component({
  selector: 'app-tab-group-wrapper',
  template: `<app-tab-group>
    <app-tab label="Tab 1"> Content 1 </app-tab>
    <app-tab label="Tab 2"> Content 2 </app-tab>
    <app-tab [isDisabled]="true" label="Disabled Tab"> Content 3 </app-tab>
    <app-tab label="Tab 4"> Content 4 </app-tab>
  </app-tab-group>`
})
export class TabGroupWrapperComponent {}

describe('TabGroupComponent', () => {
  let wrapper: TabGroupWrapperComponent
  let component: TabGroupComponent
  let fixture: ComponentFixture<TabGroupWrapperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabGroupComponent, TabComponent, TabGroupWrapperComponent],
      imports: [getTranslocoModule()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGroupWrapperComponent)
    wrapper = fixture.componentInstance
    component = fixture.debugElement.query(
      By.directive(TabGroupComponent)
    ).componentInstance
    fixture.detectChanges()
  })

  it('binds child tabs', () => {
    expect(component.tabs.length).toEqual(4)
  })

  it('sets first tab to active by default', () => {
    expect(component.tabs.get(0)?.isActive).toEqual(true)
    expect(component.tabs.get(1)?.isActive).toEqual(false)
    expect(component.tabs.get(2)?.isActive).toEqual(false)
    expect(component.tabs.get(3)?.isActive).toEqual(false)
  })

  it('selects tab', () => {
    const secondTabButton = fixture.debugElement.query(
      By.css('[data-testid="tab-1"]')
    )

    secondTabButton.nativeElement.click()
    expect(component.tabs.get(0)?.isActive).toEqual(false)
    expect(component.tabs.get(1)?.isActive).toEqual(true)
    expect(component.tabs.get(2)?.isActive).toEqual(false)
    expect(component.tabs.get(3)?.isActive).toEqual(false)
  })

  it('does not select disabled tab', () => {
    spyOn(component, 'selectTab').and.callThrough()
    const disabledTabButton = fixture.debugElement.query(
      By.css('[data-testid="tabs"] [disabled]')
    )

    disabledTabButton.nativeElement.click()
    expect(component.tabs.get(0)?.isActive).toEqual(true)
    expect(component.tabs.get(1)?.isActive).toEqual(false)
    expect(component.tabs.get(2)?.isActive).toEqual(false)
    expect(component.tabs.get(3)?.isActive).toEqual(false)
    expect(component.selectTab).not.toHaveBeenCalled()
  })
})
