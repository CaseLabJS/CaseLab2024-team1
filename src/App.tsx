import './App.css'
import { documentControllerApi } from './api/documentController'

function App() {

  const version = {
    title: '28 октября 17:14',
    userId: 2,
    documentTypeId: 1,
    values: [
      {
        attributeName: 'testAttr2',
        value: 'Hi, there',
      },
    ],
    base64Content: '',
  }

  const api = documentControllerApi

  const create = () => {
    api.createDocument(version).then((data) => console.log(data))
  }

  const get = () => {
    api.getDocumentById(3).then((data) => console.log(data))
  }

  const patch = () => {
    api
      .patchDocumentVersion(3, { description: 'USER 3' })
      .then((data) => console.log(data))
  }

  const update = () => {
    api
      .createDocumentVersion(3, {
        ...version,
        description: 'NEW 3',
      })
      .then((data) => console.log(data))
  }

  const remove = () => {
    api.deleteDocument(4).then((data) => console.log(data))
  }

  const getAll = () => {
    api.getDocuments().then((data) => console.log(data))
  }

  return (
    <>
      <button onClick={create}>new </button>
      <button onClick={get}>get </button>
      <button onClick={update}>update </button>
      <button onClick={patch}>patch </button>
      <button onClick={remove}>remove </button>
      <button onClick={getAll}>getAll </button>
    </>
  )
}

export default App
