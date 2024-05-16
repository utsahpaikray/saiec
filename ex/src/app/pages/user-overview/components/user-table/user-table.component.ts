import { Component, EventEmitter, Input, Output, inject } from '@angular/core'
import { CurrentUserService } from '@core/current-user/current-user.service'
import { IdentityUser } from '@core/generated/types'
import { Viewports as Viewport } from '@core/interfaces/breakpoint.enum'
import { WindowResizeService } from '@core/window-resize/window-resize.service'
import { Observable, map } from 'rxjs'
import { UserTableHeaderLabel } from './user-table.model'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent {
  @Input() users: IdentityUser[]
  @Input() noDataText?: string

  @Output() public selectUser = new EventEmitter<string>()
  private windowResizeService = inject(WindowResizeService)

  public headers: UserTableHeaderLabel[] = [
    UserTableHeaderLabel.User,
    UserTableHeaderLabel.Email
  ]
  public breakpoint$: Observable<Viewport> =
    this.windowResizeService.breakpoint$
  public viewports = Viewport

  public isTable$ = this.breakpoint$.pipe(
    map((breakpoint) => breakpoint === this.viewports.Desktop)
  )

  /**
   * Click on user event
   * @param {IdentityUser} user
   */
  public clickOnUserEvent(user: IdentityUser): void {
    this.selectUser.emit(user.id)
  }
}
