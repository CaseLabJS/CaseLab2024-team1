import { Roles } from '@/types/sharedTypes'

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
const vote = {
  participants: [user],
  documentId: 0,
  documentVersion: {
    id: 1,
    versionId: 1,
    title: 'hw.txt',
    description: 'test',
    createdAt: '2024-12-12T23:59:59.425',
    values: [
      {
        attributeName: 'testAttr2',
        value: '52',
      },
    ],
    base64Content: 'SGVsbG8sIFdvcmxkIQ==',
    signatures: [
      {
        hash: 1322131231,
        placeholderTitle: 'testPlaceholder',
        user,
      },
    ],
  },
  approvalThreshold: 0,
  deadline: '2024-11-21',
  status: 'PENDING',
}

export default Promise.resolve(() => vote)
