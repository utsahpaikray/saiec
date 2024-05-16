import { APP_INITIALIZER } from '@angular/core'
import { TranslocoService } from '@ngneat/transloco'

export function preloadLang(transloco: TranslocoService) {
  return function () {
    const lang = transloco.getActiveLang()
    return transloco.load(lang).toPromise()
  }
}

export const preLoadLang = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: preloadLang,
  deps: [TranslocoService]
}
