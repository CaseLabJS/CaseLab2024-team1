import { DocumentType } from '@/types/sharedTypes.ts'

const defaultDocumentType = {
  id: 17181920,
  name: 'Неформализованный документ',
  attributes: [
    {
      id: 17112128191,
      name: 'Номер',
      required: false,
    },
    {
      id: 12143391,
      name: 'Дата',
      required: false,
    },
    {
      id: 171234192,
      name: 'Комментарий',
      required: false,
    },
  ],
}

export const testDocumentsType: DocumentType[] = [
  defaultDocumentType,
  {
    id: 4357645,
    name: 'Накладная',
    attributes: [
      {
        id: 4653276,
        name: 'Номер документа',
        required: true,
      },
      {
        id: 465344255,
        name: 'Основание',
        required: false,
      },
      {
        id: 46531323,
        name: 'Комментарий',
        required: false,
      },
    ],
  },
  {
    id: 1234567,
    name: 'Договор',
    attributes: [
      {
        id: 7654321,
        name: 'Номер договора',
        required: true,
      },
      {
        id: 7654322,
        name: 'Дата подписания',
        required: true,
      },
      {
        id: 7654323,
        name: 'Стороны договора',
        required: false,
      },
    ],
  },
  {
    id: 89101112,
    name: 'Счет-фактура',
    attributes: [
      {
        id: 8901234,
        name: 'Номер счета',
        required: true,
      },
      {
        id: 8901235,
        name: 'Дата выставления',
        required: true,
      },
      {
        id: 8901236,
        name: 'Сумма',
        required: true,
      },
    ],
  },
  {
    id: 13141516,
    name: 'Акт выполненных работ',
    attributes: [
      {
        id: 13141567671,
        name: 'Номер акта',
        required: true,
      },
      {
        id: 1314152,
        name: 'Дата выполнения',
        required: true,
      },
      {
        id: 1314153,
        name: 'Описание работ',
        required: false,
      },
    ],
  },
  {
    id: 1718145450,
    name: 'Заявление',
    attributes: [
      {
        id: 1718191,
        name: 'ФИО заявителя',
        required: true,
      },
      {
        id: 1712228192,
        name: 'Дата подачи',
        required: true,
      },
      {
        id: 1718193,
        name: 'Причина обращения',
        required: false,
      },
    ],
  },
]
