import { Signature } from '../Signature';
import { Value } from './Value';

export type DocumentVersion = {
  id: number;
  versionId: number;
  title: string;
  description: string;
  createdAt: Date;
  values: Value[];
  base64Content: string;
  signatures: Signature[];
};
