import './App.css'
import { attributeControllerApi } from './api/attributeController'

function App() {
  const model = {
    documentTypesNames: ['testType'],
    name: 'extraAttr1',
    required: false,
  }

  const api = attributeControllerApi

  const create = () => {
    api
      .createAttribute({
        ...model,
      })
      .then((data) => console.log(data))
  }

  const get = () => {
    api.getAttributeById(3).then((data) => console.log(data))
  }

  const patch = () => {
    api
      .patchAttribute(3, { name: 'new document extra mega type' })
      .then((data) => console.log(data))
  }

  const update = () => {
    api
      .updateAttribute({
        ...model,
        id: 3,
        required: true,
        documentTypesNames: ['new document extra type', 'testType'],
      })
      .then((data) => console.log(data))
  }

  const remove = () => {
    api.deleteAttribute(2).then((data) => console.log(data))
  }

  const getAll = () => {
    api.getAttributes().then((data) => console.log(data))
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
