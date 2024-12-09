import { Document, Roles } from '@/types/sharedTypes.ts'
import { DocumentTransitions } from '@/api/documentController/types.ts'
import authStore from '@/stores/AuthStore'

const generateRandomDate = () => {
  const start = new Date(2024, 0, 1)
  const end = new Date(2024, 11, 31)
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

export const generateMockDocuments = (count: number): Document[] => {
  const { user } = authStore
  const documents: Document[] = []

  for (let i = 0; i < count; i++) {
    const document: Document = {
      id: i + 1,
      user: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        id: user?.id,
        name: `admin ${i + 1}`,
        surname: `admin ${i + 1}`,
        email: 'admin',
        roles: [
          {
            id: 1,
            name: Roles.ADMIN,
          },
        ],
      },
      documentType: {
        id: 1,
        name: `testType-${i + 1}`,
        attributes: [
          {
            id: 1,
            name: `testAttr1-${i + 1}`,
            required: Math.random() < 0.5,
          },
          {
            id: 2,
            name: `testAttr2-${i + 1}`,
            required: Math.random() < 0.5,
          },
        ],
      },
      documentVersions: [
        {
          id: 1,
          versionId: i + 1,
          title: `Новая отчетность номер ${i + 1}`,
          description: `Описание для документа ${i + 1}`,
          createdAt: generateRandomDate().toISOString(),
          values: [
            {
              attributeName: `testAttr2-${i + 1}`,
              value: `${Math.floor(Math.random() * 100)}`,
            },
          ],
          base64Content: '',
          signatures: [
            {
              hash: Math.floor(Math.random() * 1000000000),
              placeholderTitle: `Placeholder ${i + 1}`,
              user: {
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
            },
          ],
        },
      ],
      comments: [
        {
          id: 5 + i,
          author: {
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
          content: `Comment content ${i + 1}`,
          createdAt: generateRandomDate().toISOString(),
        },
      ],
      state: DocumentTransitions.CREATED,
    }

    documents.push(document)
  }

  return documents
}
