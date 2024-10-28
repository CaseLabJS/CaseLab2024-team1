import './App.css'
import { documentTypesControllerApi } from './api/documentTypesController'

function App() {
  const model = {
    name: 'new document extra type',
    attributes: [
      {
        id: 1,
        name: 'testAttr1',
        required: false,
      },
    ],
  }

  const api = documentTypesControllerApi

  const create = () => {
    api.createDocumentTypes(model).then((data) => console.log(data))
  }

  const get = () => {
    api.getDocumentTypesById(1).then((data) => console.log(data))
  }

  const patch = () => {
    api
      .patchDocumentTypes(3, { name: 'new document extra mega type' })
      .then((data) => console.log(data))
  }

  const update = () => {
    api
      .updateDocumentTypes({
        ...model,
        id: 3,
        attributes: [
          ...model.attributes,
          {
            id: 2,
            name: 'testAttr2',
            required: true,
          },
        ],
      })
      .then((data) => console.log(data))
  }

  const remove = () => {
    api.deleteDocumentTypes(2).then((data) => console.log(data))
  }

  const getAll = () => {
    api.getDocumentsTypes().then((data) => console.log(data))
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
