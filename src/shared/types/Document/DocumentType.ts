import { Attribute } from './Attribute';

// document-types / attributes
export type DocumentType = {
  id: number;
  name: string;
  attributes: Attribute[];
};
