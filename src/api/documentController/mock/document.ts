import { Document, Roles } from '@/types/sharedTypes'
import { DocumentTransitions } from '@/api/documentController/types.ts'

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

const document: Document = {
  id: 1,
  user,
  documentType: {
    id: 1,
    name: 'testType',
    attributes: [
      {
        id: 1,
        name: 'testAttr1',
        required: false,
      },
      {
        id: 2,
        name: 'testAttr2',
        required: true,
      },
    ],
  },
  documentVersions: [
    {
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
  ],
  comments: [
    {
      id: 2,
      author: user,
      content: 'Случайный комментарий',
      createdAt: '2024-11-07T10:07:16.357068023',
    },
  ],
  state: DocumentTransitions.CREATED,
}

export default Promise.resolve(() => document)
