import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-footer-logo',
  templateUrl: './footer-logo.component.html',
  styleUrls: ['./footer-logo.component.scss']
})
export class FooterLogoComponent {
  @Input()
  iconName: string
}
