import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ComponentsModule } from '@components/components.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { UserAccessItemComponent } from './user-access-item.component'
import { DatalistModule } from '@components/datalist/datalist.module'

@NgModule({
  declarations: [UserAccessItemComponent],
  exports: [UserAccessItemComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    DatalistModule,
    TranslocoRootModule
  ]
})
export class UserAccessItemModule {}
