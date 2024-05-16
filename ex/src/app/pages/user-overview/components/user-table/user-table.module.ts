import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'

// Components
import { RouterModule } from '@angular/router'
import { ProgressSpinnerModule } from '@components/progress-spinner/progress-spinner.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { UserService } from '@core/users/user.service'
import { UserTableComponent } from './user-table.component'

@NgModule({
  declarations: [UserTableComponent],
  exports: [UserTableComponent],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    TranslocoRootModule,
    RouterModule
  ],
  providers: [UserService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserTableModule {}
