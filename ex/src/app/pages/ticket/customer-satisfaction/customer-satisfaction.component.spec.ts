import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing'

import { CustomerSatisfactionComponent } from './customer-satisfaction.component'
import { HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { By } from '@angular/platform-browser'
import { CustomerSatisfaction } from './customer-satisfaction.interface'
import { ServiceDeskLangCodes } from '@core/interfaces/service-desk-lang-codes.enum'
import { getTranslocoModule } from '@core/locale/transloco-testing.module'

describe('CustomerSatisfactionComponent', () => {
  let component: CustomerSatisfactionComponent
  let fixture: ComponentFixture<CustomerSatisfactionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomerSatisfactionComponent,
        HttpClientModule,
        getTranslocoModule()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(CustomerSatisfactionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should show 3 satisfaction buttons', () => {
    const satisfactionButtons = fixture.debugElement.queryAll(
      By.css('[data-testid^="satisfaction-button-"]')
    )
    expect(satisfactionButtons.length).toBe(3)
  })

  it('should render icon', () => {
    const dissatisfiedIcon = fixture.debugElement.query(
      By.css('[data-testid="satisfaction-icon-sad"]')
    )
    expect(dissatisfiedIcon).toBeTruthy()
  })

  it('should render text', async () => {
    component.languageCode = ServiceDeskLangCodes.EN

    fixture.detectChanges()
    await fixture.whenStable()

    const dissatisfiedText = fixture.debugElement.query(
      By.css('[data-testid="satisfaction-text-sad"]')
    )
    expect(dissatisfiedText).toBeTruthy()
    expect(dissatisfiedText.nativeElement.classList).toContain('text-red-500')
  })

  it('should trigger click event', fakeAsync(() => {
    const satisfaction = {
      iconKey: 'happy',
      textColor: 'green-800',
      translationKey: 'Tickets.CustomerSatisfaction.Satisfied'
    } as CustomerSatisfaction

    spyOn(component.clickEvent, 'emit')
    const satisfiedButton = fixture.debugElement.query(
      By.css('[data-testid="satisfaction-button-happy"]')
    )
    satisfiedButton.triggerEventHandler('click', null)
    tick()
    fixture.detectChanges()

    expect(component.clickEvent.emit).toHaveBeenCalledWith(satisfaction)
  }))
})
