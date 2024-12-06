import { Document } from '@/types/sharedTypes.ts'
import { FormItem } from '@/components/createDocumentForm/types.ts'
import { base64ToFile } from '@/utils/base64ToFile.ts'

export const createFormItemFromDocument = (
  draftDocument: Document
): FormItem => {
  const latestVersion = draftDocument.documentVersions[0]

  if (!latestVersion) {
    throw new Error('Нет доступных версий документа')
  }

  const title = latestVersion.title
  const description = latestVersion.description
  const documentTypeId = draftDocument.documentType.id
  const attributes = latestVersion.values
    .sort((a, b) => a.attributeName.localeCompare(b.attributeName))
    .map((attr) => {
      return {
        [attr.attributeName]: attr.value || '',
      }
    })

  const file = base64ToFile(latestVersion.base64Content)

  return {
    file,
    title,
    documentTypeId,
    description,
    attributes,
  }
}
