import { initFederation } from '@angular-architects/module-federation'
import { environment } from '@environments/environment'
import { Log, Tag } from './logging'

const enableMocking = async () => {
  if (environment.production === false && environment.mocks) {
    const { worker, startOptions } = await import('./mocks/browser')
    worker.start(startOptions)
  }
}

enableMocking()
  .catch((err) => Log.error(err, Tag.error('Mocking')))
  .then(() => initFederation({}))
  .catch((err) => Log.error(err, Tag.error('Federation')))
  .then(() => import('./bootstrap'))
  .catch((err) => Log.error(err, Tag.error('Bootstrap')))
