import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@core/guards/auth.guard'
import { CurrentUserStoreModule } from '@stores/current-user/current-user.module'
import { AccessDeniedComponent } from './access-denied.component'

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AccessDeniedComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), CurrentUserStoreModule],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AccessDeniedRoutingModule {}
