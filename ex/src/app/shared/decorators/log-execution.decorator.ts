/* eslint-disable no-console */
import { environment } from '@environments/environment'
import { Observable, tap } from 'rxjs'

export const LogExecution = (): MethodDecorator => {
  if (environment.production) {
    return (_target, _key: string | symbol, descriptor) => descriptor
  }
  return (
    _target,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: unknown[]) {
      const guardName = this.constructor.name
      console.group(`Guard method "${guardName}.${String(key)}" invocation`)
      console.log('Arguments:', args)

      const result = originalMethod.apply(this, args)

      if (result instanceof Promise) {
        return result.then((res) => {
          console.log(`Resolved with result:`, res)
          console.groupEnd()
          return res
        })
      } else if (result instanceof Observable) {
        return result.pipe(
          tap((res) => {
            console.log(`Resolved with result:`, res)
            console.groupEnd()
          })
        )
      } else {
        console.log(`Resolved with result:`, result)
        console.groupEnd()
        return result
      }
    }

    return descriptor
  }
}
