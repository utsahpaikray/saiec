import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ReactiveFormsModule } from '@angular/forms'

// Components
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { AlertModule } from '@components/alert/alert.module'
import { ModalModule } from '@components/modal/modal.module'
import { ComponentsModule } from '@components/components.module'
import { UserService } from '@core/users/user.service'
import { AddUserComponent } from './add-user.component'

@NgModule({
  declarations: [AddUserComponent],
  exports: [AddUserComponent],
  imports: [
    CommonModule,
    ModalModule,
    ComponentsModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    TranslocoRootModule,
    AlertModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserService]
})
export class AddUserModule {}
