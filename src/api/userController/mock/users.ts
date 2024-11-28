import { Roles, User } from '@/types/sharedTypes'

const users: User[] = [
  {
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
  },
  {
    id: 2,
    name: 'Vitya',
    surname: 'Buh',
    email: 'vit@gmail.com',
    roles: [
      {
        id: 1,
        name: Roles.USER,
      },
    ],
  },
  {
    id: 3,
    name: 'Alex',
    surname: 'Crow',
    email: 'Alex@ya.ru',
    roles: [
      {
        id: 1,
        name: Roles.USER,
      },
    ],
  },
]

export default Promise.resolve(() => users)
