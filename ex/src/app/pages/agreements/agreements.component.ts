import { Component, inject } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent {
  private store = inject(Store)
}
