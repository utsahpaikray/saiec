import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { TabComponent } from '../tab/tab.component'

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent
  implements AfterViewInit, AfterContentInit, OnDestroy
{
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>
  @ViewChildren('tab') tabsRef!: QueryList<ElementRef>
  @ViewChild('tracker') trackerRef!: ElementRef

  private activeTab = 0
  private unsubscribe$: Subject<void> = new Subject<void>()

  public indicatorStyles = {
    left: '0',
    right: '0',
    transition: 'none'
  }

  constructor(private translocoService: TranslocoService) {}

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter((tab) => !tab.isDisabled)
    const firstActiveTab = activeTabs[0]

    // By default select first tab
    if (firstActiveTab) {
      firstActiveTab.isActive = true
    }
  }

  ngAfterViewInit(): void {
    this.translocoService.langChanges$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        // We need the setTimeout here so we can get the translated elementRef's size correctly
        setTimeout(() => {
          this.setIndicatorLeftRightPositionOnActiveTab(this.activeTab)
        })
      })
  }

  @HostListener('window:resize')
  onResize() {
    this.setIndicatorLeftRightPositionOnActiveTab(this.activeTab)
  }

  /**
   * Clean up subscriptions on component destroy
   */
  public ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  /**
   * Show correct tab
   * @param {TabComponent} tabangular lyfecycles
   */
  public selectTab(tabIndex: number, tab: TabComponent): void {
    if (tab.isDisabled) {
      return
    }
    this.setVisibilityOfTabs(false)
    this.setIndicatorLeftRightPositionOnActiveTab(tabIndex)
    this.activeTab = tabIndex
    tab.isActive = true
  }

  /**
   * Set visibility of all tabs
   * @param {boolean} isActive
   */
  private setVisibilityOfTabs(isActive: boolean): void {
    this.tabs.forEach((tab) => {
      if (tab.isActive !== isActive) {
        tab.isActive = isActive
      }
    })
  }

  setIndicatorLeftRightPositionOnActiveTab(tabIndex: number) {
    const activeTabRef = this.tabsRef.toArray()[tabIndex]
    const trackerWidth = this.trackerRef?.nativeElement.offsetWidth

    if (tabIndex > this.activeTab) {
      this.indicatorStyles.transition =
        'left 750ms cubic-bezier(0.075, 0.82, 0.165, 1) 250ms, right 750ms cubic-bezier(0.075, 0.82, 0.165, 1)'
    } else if (tabIndex < this.activeTab) {
      this.indicatorStyles.transition =
        'left 750ms cubic-bezier(0.075, 0.82, 0.165, 1), right 750ms cubic-bezier(0.075, 0.82, 0.165, 1) 250ms'
    } else {
      this.indicatorStyles.transition = 'none'
    }

    this.indicatorStyles.right = `${
      trackerWidth -
      (activeTabRef?.nativeElement.offsetLeft +
        activeTabRef?.nativeElement.offsetWidth)
    }px`
    this.indicatorStyles.left = `${activeTabRef?.nativeElement.offsetLeft}px`
  }
}
