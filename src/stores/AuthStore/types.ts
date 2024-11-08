import { Roles } from '@/types/sharedTypes'

export type TokenPayloadUser = {
  id: number
  email: string
  roles: Roles[]
}
