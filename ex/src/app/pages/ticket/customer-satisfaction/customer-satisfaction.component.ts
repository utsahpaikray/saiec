import { CommonModule } from '@angular/common'
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { CustomerSatisfaction } from './customer-satisfaction.interface'

@Component({
  selector: 'app-customer-satisfaction',
  templateUrl: './customer-satisfaction.component.html',
  standalone: true,
  imports: [CommonModule, TranslocoRootModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerSatisfactionComponent {
  /**
   * language code for scoped translation
   */
  @Input()
  languageCode: string

  /**
   * Click handler
   */
  @Output()
  clickEvent = new EventEmitter<CustomerSatisfaction>()

  /**
   * Customer satisfaction icon key, text color & translation key
   */
  public satisfactions: CustomerSatisfaction[] = [
    {
      iconKey: 'happy',
      textColor: 'green-800',
      translationKey: 'Tickets.CustomerSatisfaction.Satisfied'
    },
    {
      iconKey: 'neutral',
      textColor: 'orange-500',
      translationKey: 'Tickets.CustomerSatisfaction.Neutral'
    },
    {
      iconKey: 'sad',
      textColor: 'red-500',
      translationKey: 'Tickets.CustomerSatisfaction.Dissatisfied'
    }
  ]
}
