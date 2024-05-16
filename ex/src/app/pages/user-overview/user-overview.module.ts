import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

// Components
import { LinkModule } from '@components/link/link.module'
import { SearchInputModule } from '@components/search-input/search-input.module'
import { TitleModule } from '@components/title/title.module'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { AdminNavigationModule } from '@features/admin-navigation/admin-navigation.module'
import { DefaultTemplateModule } from '@features/templates/default-template/default-template.module'
import { AddUserModule } from './components/add-user/add-user.module'
import { UserTableModule } from './components/user-table/user-table.module'
import { UserOverviewRoutingModule } from './user-overview-routing.module'
import { UserOverviewComponent } from './user-overview.component'

@NgModule({
  declarations: [UserOverviewComponent],
  imports: [
    CommonModule,
    LinkModule,
    TitleModule,
    UserOverviewRoutingModule,
    UserTableModule,
    AddUserModule,
    AdminNavigationModule,
    DefaultTemplateModule,
    TranslocoRootModule,
    SearchInputModule
  ]
})
export class UserOverviewModule {}
