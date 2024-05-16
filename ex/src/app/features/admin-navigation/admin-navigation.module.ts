import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { NavigationModule } from '@components/navigation/navigation.module'
import { AdminNavigationComponent } from './admin-navigation.component'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

@NgModule({
  declarations: [AdminNavigationComponent],
  exports: [AdminNavigationComponent],
  imports: [CommonModule, NavigationModule, TranslocoRootModule]
})
export class AdminNavigationModule {}
