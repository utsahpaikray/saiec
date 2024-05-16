import {
  TranslocoTestingModule,
  TranslocoTestingOptions
} from '@ngneat/transloco'
import en from '@assets/i18n/en-US.json'
import nl from '@assets/i18n/nl-NL.json'
import es from '@assets/i18n/es-ES.json'
import { localeList } from './locale-list'

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { 'en-US': en, 'nl-NL': nl, 'es-ES': es },
    translocoConfig: {
      availableLangs: localeList.map((locale) => locale.code),
      defaultLang: localeList[0].code
    },
    preloadLangs: true,
    ...options
  })
}
