export interface FormItem {
  file?: File
  title: string
  documentTypeId: number
  description: string
  attributes: Record<string, string>[]
}

export interface FormValues {
  items: FormItem[]
}
