import { useNavigate } from 'react-router-dom'
import { JournalState } from './types'
import { Dispatch, SetStateAction } from 'react'
import {
  GridRowSelectionModel,
  GridPaginationModel,
  GridRowParams,
} from '@mui/x-data-grid'

export const useHandleFunctions = (
  setState: Dispatch<SetStateAction<JournalState>>
) => {
  const navigate = useNavigate()

  const handleSelectionModelChange = (
    newSelectionModel: GridRowSelectionModel
  ) => {
    setState((prevState) => ({
      ...prevState,
      selectionModel: [...newSelectionModel],
    }))
  }

  const handlePaginationModelChange = (
    paginationModel: GridPaginationModel
  ) => {
    setState((prevState) => ({ ...prevState, paginationModel }))
  }

  const handleRowClick = (params: GridRowParams) => {
    navigate(`${params.id}`)
  }

  return {
    handleSelectionModelChange,
    handlePaginationModelChange,
    handleRowClick,
  }
}
