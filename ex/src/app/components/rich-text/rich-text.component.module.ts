import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

// Components
import { TranslocoRootModule } from '@core/locale/transloco-root.module'
import { RichTextComponent } from './rich-text.component'
import { SafeHtmlModule } from '@core/pipes/safe-html.module'

@NgModule({
  declarations: [RichTextComponent],
  exports: [RichTextComponent],
  imports: [CommonModule, RouterModule, TranslocoRootModule, SafeHtmlModule]
})
export class RichTextModule {}
