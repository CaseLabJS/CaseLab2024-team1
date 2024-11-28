import { FC, useEffect, useState } from 'react'
import { Censor, CensorsListMenuProps } from './types'
import { Menu, Divider, ListSubheader } from '@mui/material'
import { usersListStore } from '@/stores/UsersListStore'
import { observer } from 'mobx-react-lite'
import UserStore from '@/stores/UserStore'
import { menuPositionConfig } from './constants'
import { CensorsList } from './censorsList'

export const CensorsListMenu: FC<CensorsListMenuProps> = observer(
  ({ render, anchorEl, setAnchorEl }) => {
    const [censors, setCensors] = useState<InstanceType<typeof UserStore>[]>([])
    const { users } = usersListStore

    useEffect(() => {
      if (users.length === 0) {
        void usersListStore.fetchUsers()
      }
      // добавление users в зависимости вызовет бесконечный цикл
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClose = () => {
      setAnchorEl(null)
    }

    return (
      <>
        <Menu
          {...menuPositionConfig}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <ListSubheader sx={{ maxWidth: '800px', minWidth: '480px' }}>
            Выбрано подписей
          </ListSubheader>

          <CensorsList
            censors={censors}
            onCensorSelect={(censor: Censor) => {
              setCensors(censors.filter((item) => item !== censor))
            }}
            selected
          />

          <ListSubheader
            sx={{
              backgroundColor: 'background.default',
              marginTop: '0.5rem',
              padding: '1rem',
            }}
          >
            {render(censors)}
          </ListSubheader>

          <Divider />
          <ListSubheader>Подписи</ListSubheader>

          <CensorsList
            censors={users.filter((user) => !censors.includes(user))}
            onCensorSelect={(censor: Censor) => {
              setCensors([...censors, censor])
            }}
            selected={false}
          />
        </Menu>
      </>
    )
  }
)
