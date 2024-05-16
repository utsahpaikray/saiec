import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { FormsModule } from '@angular/forms'
import { TranslocoRootModule } from '@core/locale/transloco-root.module'

// Components
import { ToastComponent } from './toaster/toast/toast.component'
import { ToasterComponent } from './toaster/toaster.component'
import { TabsModule } from './tabs/tabs.module'
import { AlertModule } from './alert/alert.module'
import { DynamicLinkModule } from './dynamic-link/dynamic-link.module'
import { RichTextModule } from './rich-text/rich-text.component.module'
import { TitleModule } from './title/title.module'
import { LinkModule } from './link/link.module'
import { ExpansionPanelModule } from './expansion-panel/expansion-panel.module'
import { TextAreaModule } from './text-area/text-area.module'

@NgModule({
  declarations: [ToasterComponent, ToastComponent],
  exports: [
    ToasterComponent,
    ToastComponent,
    LinkModule,
    RichTextModule,
    TabsModule,
    TitleModule,
    ExpansionPanelModule,
    TextAreaModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularSvgIconModule,
    RouterModule,
    TranslocoRootModule,
    AlertModule,
    DynamicLinkModule,
    LinkModule,
    RichTextModule,
    TabsModule,
    TitleModule,
    ExpansionPanelModule,
    TextAreaModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
