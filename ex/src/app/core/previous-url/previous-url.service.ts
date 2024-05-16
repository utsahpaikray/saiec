import { Injectable } from '@angular/core'
import { Router, RoutesRecognized } from '@angular/router'
import { filter, pairwise } from 'rxjs/operators'

@Injectable()
export class PreviousUrlService {
  public url = ''

  constructor(private router: Router) {
    this.watchNavigation()
  }

  /**
   * Watch router event, and store previous url once navigation is triggered
   */
  private watchNavigation(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((event: any[]) => {
        this.url = event[0].urlAfterRedirects
      })
  }
}
