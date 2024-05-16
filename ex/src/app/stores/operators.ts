import { OperatorFunction, filter, pipe } from 'rxjs'

export const notNullOrUndefined = <T>(t: T | null): t is T =>
  t !== null && t !== undefined

export const filterNull = <T>(): OperatorFunction<T | null | undefined, T> =>
  pipe(filter((value): value is T => notNullOrUndefined(value)))
