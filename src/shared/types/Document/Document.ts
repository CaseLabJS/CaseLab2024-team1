import { User } from '../User/User';
import { DocumentVersion } from './DocumentVersion';

// documents-controller / document-type-controller
export type Document = {
  id: number;
  user: User;
  documentType: DocumentType;
  documentVersions: DocumentVersion[];
};
