import { Document, Roles } from '@/types/sharedTypes.ts'
import { defaultDocumentType } from '@/stories/selectField/testData/testData.ts'
import { testDocumentVersions } from '@/stories/autocomplete/testData/testData.ts'
import { DocumentTransitions } from '@/api/documentController/types.ts'

export const mockDocument: Document = {
  id: 1,
  user: {
    id: 1,
    name: 'Дарья',
    surname: 'Леонова',
    email: 'leonova@gmail.com',
    roles: [
      {
        id: 1,
        name: Roles.USER,
      },
    ],
  },
  documentType: defaultDocumentType,
  documentVersions: testDocumentVersions,
  comments: [
    {
      id: 5,
      author: {
        id: 1,
        name: 'Софья',
        surname: 'Смирнова',
        email: 'smr@mail.ru',
        roles: [
          {
            id: 1,
            name: Roles.USER,
          },
        ],
      },
      content: 'Осталось еще немного и сможем подписать!',
      createdAt: '2024-12-01T12:35:16.463465',
    },
    {
      id: 6,
      author: {
        id: 1,
        name: 'Даниил',
        surname: 'Пруцков',
        email: 'prutz000@gmail.com',
        roles: [
          {
            id: 1,
            name: Roles.ADMIN,
          },
        ],
      },
      content: 'Отлично, продолжаем в том же духе!',
      createdAt: '2024-12-01T12:48:44.655564',
    },
    {
      id: 8,
      author: {
        id: 1,
        name: 'Роман',
        surname: 'Алюшин',
        email: 'alush@mail.com',
        roles: [
          {
            id: 1,
            name: Roles.USER,
          },
        ],
      },
      content:
        'Не забудь про поправки, о которых я говорил вчера- будет интересно увидеть готовый результат',
      createdAt: '2024-12-03T14:16:52.15191',
    },
  ],
  state: DocumentTransitions.CREATED,
}
