import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { signatureControllerApi } from '@/api/signatureController'

const Signature = observer(function Signature() {
  const [model, setModel] = useState<string>(
    JSON.stringify(
      {
        userTo: {
          name: 'VIP User',
          surname: 'VIP',
          email: 'admin@rr.tu',
          roles: [
            {
              id: 1,
              name: 'ADMIN',
            },
          ],
        },
      },
      null,
      2
    )
  )

  const [id, setId] = useState(0)

  const api = signatureControllerApi

  const create = () => {
    api
      .createSignatureRequest({
        userIdTo: 1,
        documentVersionId: 1,
        documentId: 2,
      })
      .then((data) => console.log(data))
      .catch((error) => console.error('Error creating document:', error))
  }

  const get = () => {
    api
      .getSignatureRequestById(id)
      .then((data) => {
        console.log(data)
        setModel(JSON.stringify(data, null, 2))
      })
      .catch((error) => console.error('Error  :', error))
  }

  const getAll = () => {
    api
      .getSignatureRequests()
      .then((data) => console.log(data))
      .catch((error) => console.error('Error  :', error))
  }

  const sign = () => {
    api
      .sign(id, { placeholderTitle: 'placeholderTitle', status: 'draw' })
      .then((data) => console.log(data))
      .catch((error) => console.error('Error  :', error))
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
        value={model}
        onChange={(e) => setModel(e.target.value)}
      ></textarea>
      <div
        style={{
          width: '200px',
          textAlign: 'left',
          rowGap: '10px',
          display: 'grid',
        }}
      >
        <button onClick={create}>Создать запрос на подпись </button>
        <button onClick={get}>get Signature request</button>
        <button onClick={getAll}>getAll Signature request</button>
        <button onClick={sign}>sign</button>
      </div>
    </div>
  )
})

export default Signature
