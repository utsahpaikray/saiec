export interface Maximo {
  readAccess: boolean
  writeAccess: boolean
}

export interface MaximoState {
  maximoAccess: Maximo | null
  loading: boolean
  error: Error | null
}
