import { User } from '@/types/sharedTypes'
import authStore from '@/stores/AuthStore'

export const isCurrentUser = (user1: User) => user1.id === authStore.user?.id
