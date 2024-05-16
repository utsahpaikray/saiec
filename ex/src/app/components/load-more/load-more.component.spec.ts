import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing'

import { LoadMoreComponent } from './load-more.component'
import { HttpClientModule } from '@angular/common/http'
import { By } from '@angular/platform-browser'

describe('LoadMoreComponent', () => {
  let component: LoadMoreComponent
  let fixture: ComponentFixture<LoadMoreComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadMoreComponent, HttpClientModule]
    }).compileComponents()

    fixture = TestBed.createComponent(LoadMoreComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('load more button', () => {
    it('should show as disabled if loading', () => {
      component.loading = true
      component.hasMore = false
      fixture.detectChanges()

      const loadMoreButton = fixture.debugElement.query(
        By.css('[data-testid="load-more-button"]')
      )
      expect(loadMoreButton).toBeTruthy()
      expect(loadMoreButton.nativeElement.disabled).toBe(true)
    })

    it('should not show if not loading or has nothing more to show', () => {
      component.loading = false
      component.hasMore = false
      fixture.detectChanges()

      const loadMoreButton = fixture.debugElement.query(
        By.css('[data-testid="load-more-button"]')
      )
      expect(loadMoreButton).toBeFalsy()
    })

    it('should show if it has more to show', () => {
      component.loading = false
      component.hasMore = true
      fixture.detectChanges()

      const loadMoreButton = fixture.debugElement.query(
        By.css('[data-testid="load-more-button"]')
      )
      expect(loadMoreButton).toBeTruthy()
      expect(loadMoreButton.nativeElement.disabled).toBe(false)
    })

    it('should triggers button click event', async () => {
      spyOn(component.loadMore, 'emit')
      component.loading = true
      component.hasMore = false
      fixture.detectChanges()

      const loadMoreButton = fixture.debugElement.query(
        By.css('[data-testid="load-more-button"]')
      )
      loadMoreButton.triggerEventHandler('click', null)
      fixture.detectChanges()
      await fixture.whenStable()
      expect(component.loadMore.emit).toHaveBeenCalled()
    })
  })

  describe('progress spinner', () => {
    it('should show if loading', () => {
      component.loading = true
      component.hasMore = false
      fixture.detectChanges()

      const progressSpinner = fixture.debugElement.query(
        By.css('[data-testid="load-more-progress-spinner"]')
      )
      expect(progressSpinner).toBeTruthy()
    })

    it('should not show if not loading but has more to show', () => {
      component.loading = false
      component.hasMore = true
      fixture.detectChanges()

      const progressSpinner = fixture.debugElement.query(
        By.css('[data-testid="load-more-progress-spinner"]')
      )
      expect(progressSpinner).toBeFalsy()
    })
  })
})
