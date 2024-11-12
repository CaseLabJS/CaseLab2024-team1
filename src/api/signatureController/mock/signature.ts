import { Roles } from '@/types/sharedTypes'
import { SignatureRequest } from '../types'

const user = {
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

const signature: SignatureRequest = {
  id: 1,
  userTo: user,
  documentVersionId: 2,
}

export default Promise.resolve(() => signature)
