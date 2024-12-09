import { FC, useState, useEffect } from 'react'
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
import { useToolbarButtons } from './useToolbarButtons'
import { observer } from 'mobx-react-lite'
import { useHandleFunctions } from './useHandleFunctions'

export const DocumentsJournal: FC<DocumentsJournalProps> = observer(
  ({ type }) => {
    const journalType = type in filtersMap ? type : 'all'
    const { documents, fetchMoreDocuments } = documentSignService
    const [state, setState] = useState<JournalState>(initialState)
    const {
      paginationModel: { page, pageSize },
    } = state

    const startIndex = page * pageSize
    const endIndex = (page + 1) * pageSize

    const buttons = useToolbarButtons({
      selectionModel: state.selectionModel,
      buttonTypes: ['delete', 'sign'],
    })

    const rows = Object.values(documents)
    const filterFn = filtersMap[journalType as keyof typeof filtersMap]
    const filteredRows = rows.filter(filterFn)
    const pagedRows = filteredRows.slice(startIndex, endIndex)

    useEffect(() => {
      if (endIndex > filteredRows.length) {
        void fetchMoreDocuments(pageSize)
      }
    }, [endIndex, fetchMoreDocuments, filteredRows.length, pageSize, type])

    const {
      handleSelectionModelChange,
      handlePaginationModelChange,
      handleRowClick,
    } = useHandleFunctions(setState)

    return (
      <>
        <Typography variant="h4" sx={{ pb: 2 }}>
          {JournalTypeLabelMap[journalType as keyof typeof JournalTypeLabelMap]}
        </Typography>
        <DocumentsList
          columns={columns}
          rows={pagedRows}
          buttons={buttons}
          onSelectionChange={handleSelectionModelChange}
          onPaginationModelChange={handlePaginationModelChange}
          onRowClick={handleRowClick}
          totalDocuments={filteredRows.length + pageSize} //точное количество отфильтрованных документов не известно
        />
      </>
    )
  }
)
