import { makeAutoObservable } from 'mobx';
import { type Document } from '@/shared/types';
class DocumentStore {
  documents: Document[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchDocuments() {}

  deleteDocument() {}

  updateDocument() {}
}

const documentStore = new DocumentStore();
export default documentStore;
