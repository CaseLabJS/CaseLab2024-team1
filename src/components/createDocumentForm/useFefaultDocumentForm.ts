import { useCallback } from 'react'
import { FormItem } from '@/components/createDocumentForm/types.ts'
import documentTypeListStore from '@/stores/DocumentTypeListStore'

export const useDefaultDocumentForm = (
  draftData: FormItem | null
): {
  getDefaultFormItem: () => FormItem
  getDraftFormItem: () => FormItem
} => {
  const initialDocumentType = documentTypeListStore.types[0]

  const getDefaultFormItem = useCallback((): FormItem => {
    const formItem: FormItem = {
      title: '',
      documentTypeId: initialDocumentType?.data.id || null,
      description: '',
      attributes:
        initialDocumentType?.data.attributes
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .reduce<Record<string, string>[]>((acc, attr) => {
            acc.push({
              [attr.name]: '',
            })
            return acc
          }, []) || null,
    }

    return formItem
  }, [initialDocumentType])

  const getDraftFormItem = useCallback((): FormItem => {
    const defaultFormItem = getDefaultFormItem()

    if (draftData) {
      defaultFormItem.file = draftData.file
      defaultFormItem.title = draftData.title
      defaultFormItem.documentTypeId = draftData.documentTypeId
      defaultFormItem.description = draftData.description
      defaultFormItem.attributes = draftData.attributes
    }

    return defaultFormItem
  }, [getDefaultFormItem, draftData])

  return { getDefaultFormItem, getDraftFormItem }
}
