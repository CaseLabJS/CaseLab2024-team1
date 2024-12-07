import { DocumentVersion, Roles } from '@/types/sharedTypes.ts'

export const testDocumentVersions: DocumentVersion[] = [
  {
    id: 1,
    versionId: 1,
    title: 'отчет за январь',
    description: 'Отчет за январь по продажам',
    createdAt: '2024-12-12T23:59:59.425',
    values: [
      {
        attributeName: 'суммаПродаж',
        value: '15000',
      },
    ],
    base64Content: '',
    signatures: [
      {
        hash: 1322131231,
        placeholderTitle: 'Подпись менеджера по продажам',
        user: {
          id: 1,
          name: 'Алиса',
          surname: 'Джонсон',
          email: 'alice.johnson@example.com',
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
  {
    id: 2,
    versionId: 2,
    title: 'отчет за февраль',
    description: 'Отчет за февраль по продажам',
    createdAt: '2024-12-12T23:59:59.425',
    values: [
      {
        attributeName: 'суммаПродаж',
        value: '20000',
      },
    ],
    base64Content: '',
    signatures: [
      {
        hash: 1322131232,
        placeholderTitle: 'Подпись менеджера по продажам',
        user: {
          id: 2,
          name: 'Боб',
          surname: 'Смит',
          email: 'bob.smith@example.com',
          roles: [
            {
              id: 2,
              name: Roles.USER,
            },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    versionId: 3,
    title: 'отчет за март',
    description: 'Отчет за март по расходам',
    createdAt: '2024-12-12T23:59:59.425',
    values: [
      {
        attributeName: 'суммаРасходов',
        value: '5000',
      },
    ],
    base64Content: '',
    signatures: [
      {
        hash: 1322131233,
        placeholderTitle: 'Подпись финансового менеджера',
        user: {
          id: 3,
          name: 'Чарли',
          surname: 'Браун',
          email: 'charlie.brown@example.com',
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
  {
    id: 4,
    versionId: 4,
    title: 'отчет за апрель',
    description: 'Отчет за апрель по маркетингу',
    createdAt: '2024-12-12T23:59:59.425',
    values: [
      {
        attributeName: 'расходыНаМаркетинг',
        value: '3000',
      },
    ],
    base64Content: '',
    signatures: [
      {
        hash: 1322131234,
        placeholderTitle: 'Подпись маркетингового менеджера',
        user: {
          id: 4,
          name: 'Диана',
          surname: 'Принс',
          email: 'diana.prince@example.com',
          roles: [
            {
              id: 2,
              name: Roles.USER,
            },
          ],
        },
      },
    ],
  },
]
