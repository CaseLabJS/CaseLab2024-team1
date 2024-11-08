import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { userControllerApi } from '@/api/userController'
import { UserCredentials } from '@/types/sharedTypes'

const Documents = observer(function Documents() {
  const [model, setModel] = useState<string>(
    JSON.stringify(
      {
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
      null,
      2
    )
  )

  const [id, setId] = useState(0)

  const api = userControllerApi

  const create = () => {
    api
      .createUser(JSON.parse(model) as UserCredentials)
      .then((data) => console.log(data))
      .catch((error) => console.error('Error creating document:', error))
  }

  const get = () => {
    api
      .getUserById(id, { showOnlyAlive: false })
      .then((data) => {
        console.log(data)
        setModel(JSON.stringify(data, null, 2))
      })
      .catch((error) => console.error('Error  :', error))
  }

  const patch = () => {
    api
      .patchUser(id, { surname: 'USER 3' })
      .then((data) => console.log(data))
      .catch((error) => console.error('Error  :', error))
  }

  const update = () => {
    api
      .updateUser({
        ...(JSON.parse(model) as UserCredentials),
        id,
      })
      .then((data) => console.log(data))
      .catch((error) => console.error('Error  :', error))
  }

  const remove = () => {
    api
      .deleteUser(id)
      .then((data) => console.log(data))
      .catch((error) => console.error('Error  :', error))
  }

  const getAll = () => {
    api
      .getUsers()
      .then((data) => console.log(data))
      .catch((error) => console.error('Error  :', error))
  }

  const recover = () => {
    api
      .recover(id)
      .then((data) => console.log(data))
      .catch((error) => console.error('Error :', error))
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
        <button onClick={create}>new </button>
        <button onClick={get}>get </button>
        <button onClick={update}>update </button>
        <button onClick={patch}>patch </button>
        <button onClick={remove}>remove </button>
        <button onClick={getAll}>getAll </button>
        <button onClick={recover}>recover </button>
      </div>
    </div>
  )
})

export default Documents
