// user-controller
export interface User {
    id:      number;
    name:    string;
    surname: string;
    email:   string;
    roles:   Role[];
}

export interface Role {
    id:   number;
    name: string;
}


// documents-controller / document-type-controller 
export interface Document {
    id:               number;
    user:             User;
    documentType:     DocumentType;
    documentVersions: DocumentVersion[];
}


// document-types / attributes
export interface DocumentType {
    id:         number;
    name:       string;
    attributes: Attribute[];
}

export interface Attribute {
    id:       number;
    name:     string;
    required: boolean;
}

export interface DocumentVersion {
    id:            number;
    versionId:     number;
    title:         string;
    description:   string;
    createdAt:     Date;
    values:        Value[];
    base64Content: string;
    signatures:    Signature[];
}

export interface Signature {
    hash:             number;
    placeholderTitle: string;
    user:             User;
}

export interface Value {
    attributeName: string;
    value:         string;
}


// signature-controller
export interface Sign {
    id:                number;
    userTo:            User;
    documentVersionId: number;
}

