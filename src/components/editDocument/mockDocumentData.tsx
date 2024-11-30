import { Box } from '@mui/material'
import CreateDocumentVersion from './CreateDocumentVersion'
import { Document, Roles } from '@/types/sharedTypes'

const documentMockData: Document = {
  id: 1,
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
      base64Content: 'null',
      signatures: [
        {
          hash: 1322131231,
          placeholderTitle: 'testPlaceholder',
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
    {
      id: 2,
      versionId: 2,
      title: 'УПД НФ-0000178332 от 23.11.2024',
      description:
        'УПД НФ-0000178332 от 23.11.2024 содержит информацию о выполнении сделки, включая данные о товарах/услугах, их количестве и стоимости. Документ подтверждает факт поставки и служит основанием для бухгалтерского учета и налоговой отчетности',
      createdAt: '2024-11-23T12:04:20.659318',
      values: [],
      base64Content: 'null',
      signatures: [],
    },
    {
      id: 3,
      versionId: 3,
      title: 'УПД НФ-0000178332 от 23.11.2024',
      description:
        'УПД НФ-0000178332 от 23.11.2024 содержит информацию о выполнении сделки, включая данные о товарах/услугах, их количестве и стоимости. Документ подтверждает факт поставки и служит основанием для бухгалтерского учета и налоговой отчетности',
      createdAt: '2024-11-23T12:04:37.385245',
      values: [
        {
          attributeName: 'testAttr1',
          value: 'some example value',
        },
        {
          attributeName: 'testAttr2',
          value: 'some example value 2',
        },
      ],
      base64Content:
        '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',
      signatures: [],
    },
  ],
  comments: [
    {
      id: 1,
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
      content: 'Test comment',
      createdAt: '2024-12-12T23:59:59.425',
    },
    {
      id: 2,
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
      content: 'исходящий hw.txt от 23.11?',
      createdAt: '2024-11-22T22:04:47.683127',
    },
    {
      id: 3,
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
      content: 'test comment 2',
      createdAt: '2024-11-22T22:06:54.397931',
    },
    {
      id: 4,
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
      content: 'test comment 3',
      createdAt: '2024-11-22T22:07:49.701794',
    },
    {
      id: 5,
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
      content: 'test comment 4',
      createdAt: '2024-11-22T22:09:45.548239',
    },
    {
      id: 6,
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
      content: 'test comment 5',
      createdAt: '2024-11-22T22:11:54.643215',
    },
    {
      id: 7,
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
      content: 'test comment 6',
      createdAt: '2024-11-22T22:13:43.970023',
    },
    {
      id: 8,
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
      content: 'test comment 7',
      createdAt: '2024-11-22T22:17:17.786685',
    },
    {
      id: 9,
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
      content: 'test comment 8',
      createdAt: '2024-11-22T22:17:49.120913',
    },
    {
      id: 10,
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
      content: 'test comment 9',
      createdAt: '2024-11-22T23:11:46.412549',
    },
  ],
}

const MockDocumentData = () => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CreateDocumentVersion document={documentMockData} />
    </Box>
  )
}

export default MockDocumentData
