export enum NavigationType {
  NEW_DOCUMENT = 'new-document',
  INBOX = 'inbox',
  FORWARD = 'forward',
  DRAFT = 'draft',
  DELETED = 'deleted',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
}

export const navigationLabels: Record<NavigationType, string> = {
  [NavigationType.NEW_DOCUMENT]: 'Новый документ',
  [NavigationType.INBOX]: 'Входящий',
  [NavigationType.FORWARD]: 'Исходящий',
  [NavigationType.DRAFT]: 'Черновик',
  [NavigationType.DELETED]: 'Удаленный',
  [NavigationType.PROCESSING]: 'Требующий обработки',
  [NavigationType.PROCESSED]: 'Обработанный',
}
