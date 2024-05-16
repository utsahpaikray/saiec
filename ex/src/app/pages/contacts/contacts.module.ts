import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { TitleModule } from '@components/title/title.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { ContactsComponent } from './contacts.component'
import { ContactsRoutingModule } from './contacts-routing.module'
import { ContactsGroupComponent } from './contacts-group/contacts-group.component'

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    TranslocoRootModule,
    TitleModule,
    ProgressSpinnerModule,
    ContactsRoutingModule,
    ContactsGroupComponent
  ]
})
export class ContactsModule {}
