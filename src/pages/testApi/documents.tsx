import { observer } from 'mobx-react-lite'
import { DocumentModel, documentControllerApi } from '@/api/documentController'
import { useState } from 'react'

const Documents = observer(function Documents() {
  const [version, setVersion] = useState<string>(
    JSON.stringify(
      {
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
      },
      null,
      2
    )
  )

  const [id, setId] = useState(1)

  const api = documentControllerApi

  const create = () => {
    api
      .createDocument(JSON.parse(version) as DocumentModel)
      .then((data) => console.log(data))
      .catch((error) => console.error('Error creating document:', error))
  }

  const get = () => {
    api
      .getDocumentById(id)
      .then((data) => {
        console.log(data)
        setVersion(JSON.stringify(data, null, 2))
      })
      .catch((error) => console.error('Error creating document:', error))
  }

  const patch = () => {
    api
      .patchDocumentVersion(id, { description: 'USER 3' })
      .then((data) => console.log(data))
      .catch((error) => console.error('Error creating document:', error))
  }

  const update = () => {
    api
      .createDocumentVersion(id, {
        ...(JSON.parse(version) as DocumentModel),
        description: 'NEW 3',
      })
      .then((data) => console.log(data))
      .catch((error) => console.error('Error creating document:', error))
  }

  const remove = () => {
    api
      .deleteDocument(id)
      .then((data) => console.log(data))
      .catch((error) => console.error('Error creating document:', error))
  }

  const getAll = () => {
    api
      .getDocuments()
      .then((data) => console.log(data))
      .catch((error) => console.error('Error creating document:', error))
  }

  const addComment = () => {
    api
      .addComment(id, 'Второй случайный комментарий')
      .then((data) => console.log(data))
      .catch((error) => console.error('Error creating document:', error))
  }

  const recover = () => {
    api
      .recover(id)
      .then((data) => console.log(data))
      .catch((error) => console.error('Error creating document:', error))
  }

  return (
    <div>
      <div style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}>
        <label htmlFor="id">id</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(Number(e.target.value))}
        />
      </div>

      <textarea
        rows={15}
        style={{ width: '400px' }}
        value={version}
        onChange={(e) => setVersion(e.target.value)}
      ></textarea>
      <div
        style={{
          width: '200px',
          textAlign: 'left',
          rowGap: '10px',
          display: 'grid',
        }}
      >
        <button onClick={create}>new </button>
        <button onClick={get}>get </button>
        <button onClick={update}>update </button>
        <button onClick={patch}>patch </button>
        <button onClick={remove}>remove </button>
        <button onClick={getAll}>getAll </button>
        <button onClick={addComment}>add comment </button>
        <button onClick={recover}>recover </button>
      </div>
    </div>
  )
})

export default Documents
