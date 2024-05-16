import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { ComponentsModule } from '@components/components.module'
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { AdminNavigationModule } from '@features/admin-navigation/admin-navigation.module'
import { UsersRoutingModule } from './users-routing.module'
import { UsersComponent } from './users.component'

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DefaultTemplateModule,
    AdminNavigationModule,
    UsersRoutingModule
  ]
})
export class UsersModule {}
