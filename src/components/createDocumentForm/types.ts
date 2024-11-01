export interface FormItem {
  documentType: string;
  requestSignature: boolean;
  recipient: string;
  description: string;
  attributes: Record<string, string>[];
}

export interface FormValues {
  items: FormItem[];
  recipient: string;
  status: string;
}