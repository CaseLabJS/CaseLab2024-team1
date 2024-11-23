import { FC } from 'react'
import { ManageCensorsListProps, Modes } from './types'
import { Button } from '@mui/material'

export const ManageCensorsList: FC<ManageCensorsListProps> = ({
  censors,
  setCensors,
  mode,
}) => {
  return (
    <Button variant="text" onClick={() => setCensors([])}>
      Выбрано ( {censors.length} ){' '}
      {mode === Modes.Signature ? 'подписантов' : 'голосующих'} ...
    </Button>
  )
}
