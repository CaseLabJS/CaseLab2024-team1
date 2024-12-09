import { Roles } from '@/types/sharedTypes.ts'
import { SignatureRequest, Vote } from '@/api/signatureController'

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

export const mockVote: Vote = {
  participants: [user],
  documentId: 0,
  documentVersion: {
    id: 1,
    versionId: 1,
    title: 'Ожидающий подписи',
    description: 'test',
    createdAt: '2024-12-01T22:12:50.425',
    values: [
      {
        attributeName: 'СуммаПродаж',
        value: '53255',
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
  deadline: '2024-12-02',
  status: 'PENDING',
}

export const mockSignature: SignatureRequest[] = [
  {
    id: 1,
    userTo: user,
    documentId: 1,
    documentVersionId: 1,
    status: 'PENDING',
    votingId: null,
  },
]
