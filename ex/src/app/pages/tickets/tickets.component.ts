import { Component, inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import applicationActions from '@stores/application/application.actions'
import { Applications } from '@stores/application/interfaces/application.interface'

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {
  private store = inject(Store)

  public ngOnInit(): void {
    this.store.dispatch(
      applicationActions.updateCurrentApplication({
        application: Applications.Tickets
      })
    )
  }
}
