export interface FormItem {
  file?: File
  title: string
  documentTypeId: number | null
  description: string
  attributes: Record<string, string>[] | null
}

export interface FormValues {
  items: FormItem[]
}
