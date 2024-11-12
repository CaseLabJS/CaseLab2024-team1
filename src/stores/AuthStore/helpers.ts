import { TokenManager } from '@/lib/tokenManager'
import { Roles } from '@/types/sharedTypes'

export const getUserFromToken = (token: TokenManager) => {
  const { id, sub: email, a: roles } = token.payload ?? {}

  return id && email && Array.isArray(roles)
    ? {
        id: Number(id),
        email,
        roles: roles as Roles[],
      }
    : null
}
