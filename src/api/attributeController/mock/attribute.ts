import { Attribute } from '@/types/sharedTypes'

const attribute: Attribute = {
  id: 1,
  name: 'testAttr1',
  required: false,
}

export default Promise.resolve(() => attribute)
