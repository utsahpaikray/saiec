import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SiteMaximoAccessCanReadGuard } from '@core/guards/site-maximo-access-can-read.guard'
import { SiteMaximoAccessCanWriteGuard } from '@core/guards/site-maximo-access-can-write.guard'
import { TicketsComponent } from './tickets.component'

const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
    canActivate: [SiteMaximoAccessCanReadGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/tickets-overview/tickets-overview.component').then(
            (m) => m.TicketsOverviewComponent
          )
      },
      {
        path: 'new',
        canActivate: [SiteMaximoAccessCanWriteGuard],
        loadComponent: () =>
          import('@pages/ticket-new/ticket-new.component').then(
            (m) => m.TicketNewComponent
          )
      },
      {
        path: ':ticketId',
        loadComponent: () =>
          import('@pages/ticket/ticket.component').then(
            (m) => m.TicketComponent
          )
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SiteMaximoAccessCanWriteGuard, SiteMaximoAccessCanReadGuard]
})
export class TicketsRoutingModule {}
