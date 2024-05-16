import { inject } from '@angular/core'
import { ResolveFn } from '@angular/router'
import { Store } from '@ngrx/store'
import { filterNull } from '@stores/operators'
import { siteDetailFeature } from '@stores/site-details/site-detail.state'

export const siteSourceIdResolver: ResolveFn<string> = () => {
  return inject(Store)
    .select(siteDetailFeature.selectSourceId)
    .pipe(filterNull())
}
