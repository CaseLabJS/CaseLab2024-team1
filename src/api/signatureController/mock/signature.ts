import { Roles, Signature } from '@/types/sharedTypes'

const user = {
  id: 2,
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

const signature: Signature = {
  hash: 0,
  user: user,
  placeholderTitle: 'test',
}

export default Promise.resolve(() => signature)
