import { Roles, User } from '@/types/sharedTypes'

const user: User = {
  id: 1,
  name: 'admin',
  surname: 'admin',
  email: 'admin',
  roles: [
    {
      id: 1,
      name: Roles.ADMIN,
    },
  ],
}

export default Promise.resolve(() => user)
