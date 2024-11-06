import { TokenManager } from '@/lib/tokenManager'
import { Roles } from '@/types/sharedTypes'

export const userIsAdmin = (token: TokenManager) => {
  const roles = token.payload?.a as Roles
  if (!roles) return false
  return roles.includes(Roles.ADMIN)
}
