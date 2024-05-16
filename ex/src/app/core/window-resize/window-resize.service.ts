import { Injectable } from '@angular/core'
import { Breakpoints, Viewports } from '@core/interfaces/breakpoint.enum'
import {
  Observable,
  debounceTime,
  fromEvent,
  map,
  shareReplay,
  startWith
} from 'rxjs'

/**
 * Get current width from window resize event
 * @returns {Observable<number>}
 */
const resizeObserver = (): Observable<number> => {
  return fromEvent(window, 'resize').pipe(
    startWith(null),
    map((event) =>
      event ? (event.target as Window).innerWidth : window.innerWidth
    ),
    debounceTime(300),
    shareReplay(1)
  )
}

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService {
  public currentWidth$: Observable<number> = resizeObserver()

  public breakpoint$: Observable<Viewports> = this.breakpointObserver()

  /**
   * Get site data by id
   * @param {string} siteId
   * @returns {Observable<string>}
   */
  private breakpointObserver(): Observable<Viewports> {
    return this.currentWidth$.pipe(map((width) => this.matchBreakpoint(width)))
  }

  /**
   * Check current width to match breakpoints
   * @param {number} width
   * @returns {Viewports}
   */
  private matchBreakpoint(width: number): Viewports {
    switch (true) {
      case width < Breakpoints.MD:
        return Viewports.Mobile
      case width >= Breakpoints.MD && width < Breakpoints.LG:
        return Viewports.Tablet
      case width >= Breakpoints.LG:
        return Viewports.Desktop
      default:
        return Viewports.Desktop
    }
  }
}
