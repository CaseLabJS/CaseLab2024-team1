export type JwtHeader = {
  alg: string
  typ: string
}

export type JwtPayload = {
  sub?: string
  id?: number
  exp?: number
  [key: string]: unknown
}
