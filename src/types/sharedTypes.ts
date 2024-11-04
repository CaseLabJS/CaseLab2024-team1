// user-controller
export interface User {
  id: number
  name: string
  surname: string
  email: string
  roles: Role[]
}

export interface UserCredentials {
  id?: number
  name: string
  surname: string
  email: string
  password: string
  roles?: Role[]
}

export interface Role {
  id: number
  name: string
}

// documents-controller / document-type-controller
export interface Document {
  id: number
  user: User
  documentType: DocumentType
  documentVersions: DocumentVersion[]
}

// document-types / attributes
export interface DocumentType {
  id: number
  name: string
  attributes: Attribute[]
}

export interface NewDocumentType {
  name: string
  attributeIds: number[]
}

export interface Attribute {
  id: number
  name: string
  required: boolean
}

export interface DocumentVersion {
  id: number
  versionId: number
  title: string
  description: string
  createdAt: string //ISOString
  values: Value[]
  base64Content: string
  signatures: Signature[]
}

export interface Value {
  attributeName: string
  value: string
}

// signature-controller
// POST /sign/{id}
export interface Signature {
  hash: number
  placeholderTitle: string
  user: User
}

// POST /sign/voting
export interface SignVoting {
  participants: User[]
  documentVersion: DocumentVersion
  approvalThreshold: number
  deadline: string //ISOString
  status: string
}

// POST /sign/send  | GET /sign/{id}  | GET /sign (Sign[])
export interface Sign {
  id: number
  userTo: User
  documentVersionId: number
}
