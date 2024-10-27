import { DocumentVersion } from './Document/DocumentVersion';
import { User } from './User/User';

// POST /sign/voting
export type SignVoting = {
  participants: User[];
  documentVersion: DocumentVersion;
  approvalThreshold: number;
  deadline: Date;
  status: string;
};
