import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

/* TODO: Error state goes here, use the error to indentify the issue */
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
