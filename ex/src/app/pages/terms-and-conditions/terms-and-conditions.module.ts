import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

// Components
import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module'
import { TermsAndConditionsComponent } from './terms-and-conditions.component'
import { TranslocoModule } from '@ngneat/transloco'
import { LinkModule } from '@components/link/link.module'
import { RichTextModule } from '@components/rich-text/rich-text.component.module'
import { ContentTemplateModule } from '@features/templates/content-template/content-template.module'
import { FooterModule } from '@features/footer/footer.module'

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [
    CommonModule,
    TermsAndConditionsRoutingModule,
    TranslocoModule,
    LinkModule,
    RichTextModule,
    ContentTemplateModule,
    FooterModule
  ]
})
export class TermsAndConditionsModule {}
