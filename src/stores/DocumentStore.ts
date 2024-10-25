import { makeAutoObservable } from 'mobx'

interface Document {}

class DocumentStore {
  documents: Document[] = []

  constructor() {
    makeAutoObservable(this)
  }

  fetchDocuments() {}

  deleteDocument() {}

  updateDocument() {}
}

const documentStore = new DocumentStore()
export default documentStore
