import { User } from '@/types/sharedTypes'

export interface UserData extends Omit<User, 'id'> {
  id?: number
  password?: string
}

export type UserFields = Partial<User>
