import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'

// Components
import { ComponentsModule } from '@components/components.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { ParticipantsComponent } from './participants.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [ParticipantsComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    TranslocoRootModule,
    AngularSvgIconModule,
    ReactiveFormsModule
  ],
  exports: [ParticipantsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParticipantsModule {}
