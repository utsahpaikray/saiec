import { setupWorker, type StartOptions } from 'msw/browser'
import { Log, Tag } from '../logging'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export const startOptions: StartOptions = {
  quiet: false,
  onUnhandledRequest(req) {
    const url = new URL(req.url)
    const excludedPaths = [
      '/assets',
      '/src_',
      '/roboto',
      '/favicon.ico',
      '/app'
    ]
    if (excludedPaths.some((path) => url.pathname.startsWith(path))) {
      return
    }

    req
      .json()
      .catch(() => null)
      .then((body) => {
        if (body) {
          Log.warn(
            Tag.warning('Unhandled request'),
            '\n\t',
            Tag.info('URL'),
            url.pathname,
            '\n\t',
            Tag.info('operationName'),
            body?.operationName
          )
        }
        Log.warn(
          Tag.warning('Unhandled request'),
          '\n\t',
          Tag.info('URL'),
          url.pathname
        )
      })
  }
}
