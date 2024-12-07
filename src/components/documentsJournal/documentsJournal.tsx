import { FC, useState, useEffect } from 'react'
import {
  GridPaginationModel,
  GridRowSelectionModel,
} from '@mui/x-data-grid/models'
import { Typography } from '@mui/material'
import { DocumentsList } from '@/components/documentsList/documentsList'
import documentSignService from '@/stores/DocumentsSignService'
import {
  columns,
  filtersMap,
  initialState,
  JournalTypeLabelMap,
} from './constants'
import { DocumentsJournalProps, JournalState } from './types'
import { useToolbarButtons } from './hooks'
import { observer } from 'mobx-react-lite'

export const DocumentsJournal: FC<DocumentsJournalProps> = observer(
  ({ type }) => {
    if (!(type in filtersMap)) return null
    const { documents, documentsSize, fetchMoreDocuments } = documentSignService
    const [state, setState] = useState<JournalState>(initialState)
    const { selectionModel, paginationModel, filteredDocuments, rows } = state

    const buttons = useToolbarButtons({
      selectionModel,
      buttonTypes: ['delete', 'sign'],
    })

    useEffect(() => {
      const filterFn = filtersMap[type as keyof typeof filtersMap]
      const filteredDocuments = Object.values(documents).filter(filterFn)
      setState((prevState) => ({ ...prevState, filteredDocuments }))
    }, [documents, documentsSize, type])

    useEffect(() => {
      const { page, pageSize } = paginationModel
      const startIndex = page * pageSize
      const endIndex = (page + 1) * pageSize

      if (endIndex >= filteredDocuments.length) {
        void fetchMoreDocuments(paginationModel.pageSize)
      }
      const docs = filteredDocuments.slice(startIndex, endIndex)

      setState((prevState) => ({ ...prevState, rows: docs }))
    }, [fetchMoreDocuments, filteredDocuments, paginationModel])

    const handleChange = (newSelectionModel: GridRowSelectionModel) => {
      console.log('newSelectionModel', newSelectionModel)
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

    return (
      <>
        <Typography variant="h4" sx={{ pb: 2 }}>
          {JournalTypeLabelMap[type as keyof typeof JournalTypeLabelMap]}
        </Typography>
        <DocumentsList
          columns={columns}
          rows={rows}
          buttons={buttons}
          onSelectionChange={handleChange}
          onPaginationModelChange={handlePaginationModelChange}
          totalDocuments={filteredDocuments.length + paginationModel.pageSize} //точное количество отфильтрованных документов не известно
        />
      </>
    )
  }
)
