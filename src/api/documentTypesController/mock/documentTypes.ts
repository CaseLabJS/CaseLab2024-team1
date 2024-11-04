import { DocumentType } from '@/types/sharedTypes'

const documentTypes: DocumentType = {
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
}

export default Promise.resolve(() => documentTypes)
