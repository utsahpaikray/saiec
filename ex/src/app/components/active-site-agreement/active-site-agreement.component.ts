import { Component, Input } from '@angular/core'
import { SiteAgreementFragment } from '@pages/agreements-overview/graphql/site-agreements.graphql-gen'

@Component({
  selector: 'app-active-site-agreement',
  templateUrl: './active-site-agreement.component.html'
})
export class ActiveSiteAgreementComponent {
  @Input()
  agreement: SiteAgreementFragment
}
