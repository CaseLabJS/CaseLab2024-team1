export enum NavigationType {
  NEW_DOCUMENT = 'new-document',
  INBOX = 'inbox',
  FORWARD = 'forward',
  DRAFT = 'draft',
  DELETED = 'deleted',
  SIGNING = 'signing',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
}

export const navigationLabels: Record<NavigationType, string> = {
  [NavigationType.NEW_DOCUMENT]: 'Новый документ',
  [NavigationType.INBOX]: 'Входящий',
  [NavigationType.FORWARD]: 'Исходящий',
  [NavigationType.DRAFT]: 'Черновик',
  [NavigationType.DELETED]: 'Удаленный',
  [NavigationType.SIGNING]: 'Требующий подписания',
  [NavigationType.PROCESSING]: 'Требующий согласования',
  [NavigationType.PROCESSED]: 'Обработанный',
}
