import { Attribute } from '@/types/sharedTypes'

export type AttributeModel = Omit<Attribute, 'id'> & {
  id?: number
  documentTypesNames: string[]
}

export type AttributeFields = Partial<Attribute>
