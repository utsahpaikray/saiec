import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { AngularSvgIconModule } from 'angular-svg-icon'

import { DynamicLinkModule } from '../dynamic-link/dynamic-link.module'
import { NavigationItemComponent } from './navigation-item/navigation-item.component'
import { NavigationComponent } from './navigation.component'

@NgModule({
  declarations: [NavigationComponent, NavigationItemComponent],
  exports: [NavigationComponent, NavigationItemComponent],
  imports: [
    AngularSvgIconModule,
    CommonModule,
    DynamicLinkModule,
    TranslocoRootModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavigationModule {}
