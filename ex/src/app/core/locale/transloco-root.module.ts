import { HttpClient } from '@angular/common/http'
import { Injectable, NgModule } from '@angular/core'
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule
} from '@ngneat/transloco'
import {
  TranslocoPersistLangModule,
  TRANSLOCO_PERSIST_LANG_STORAGE
} from '@ngneat/transloco-persist-lang'
import { TranslocoLocaleModule } from '@ngneat/transloco-locale'
import { environment } from '../../../environments/environment'
import { provideTranslocoMessageformat } from '@ngneat/transloco-messageformat'

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`)
  }
}

@NgModule({
  imports: [
    TranslocoPersistLangModule.forRoot({
      storage: {
        provide: TRANSLOCO_PERSIST_LANG_STORAGE,
        useValue: localStorage
      }
    }),
    TranslocoLocaleModule.forRoot()
  ],
  exports: [TranslocoModule, TranslocoLocaleModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: [
          'en-US',
          'de-DE',
          'es-ES',
          'fr-FR',
          'nl-NL',
          'pl-PL',
          'ru-RU',
          'tr-TR',
          'zh-Hans-CN'
        ],
        defaultLang: 'en-US',
        fallbackLang: 'en-US',
        missingHandler: {
          // It will use the first language set in the `fallbackLang` property
          useFallbackTranslation: true
        },
        reRenderOnLangChange: true,
        prodMode: environment.production
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    provideTranslocoMessageformat()
  ]
})
export class TranslocoRootModule {}
