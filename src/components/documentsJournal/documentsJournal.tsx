import { FC, useState, useCallback, useEffect } from 'react'
import {
  GridPaginationModel,
  GridRowId,
  GridRowSelectionModel,
} from '@mui/x-data-grid/models'
import { Typography } from '@mui/material'
import { DocumentsList } from '@/components/documentsList/documentsList'
import documentSignService, {
  DocumentWithSignature,
} from '@/stores/DocumentsSignService'
import {
  columns,
  default_pagination_model,
  filtersMap,
  JournalTypeLabelMap,
} from './constants'
import { DocumentsJournalProps } from './types'
import { useToolbarButtons } from './hooks'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

export const DocumentsJournal: FC<DocumentsJournalProps> = observer(
  ({ type }) => {
    if (!(type in filtersMap)) return null
    const { documents, documentsSize, fetchMoreDocuments } = documentSignService
    const [filteredDocuments, setFilteredDocuments] = useState<
      DocumentWithSignature[]
    >([])
    const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
      default_pagination_model
    )

    const [rows, setRows] = useState<DocumentWithSignature[]>([])

    const buttons = useToolbarButtons({
      selectionModel,
      buttonTypes: ['delete', 'sign'],
    })

    useEffect(() => {
      console.log('document', toJS(documents))

      const filterFn = filtersMap[type as keyof typeof filtersMap]
      const filtered = Object.values(documents).filter(filterFn)
      setFilteredDocuments(filtered)
    }, [documents, documentsSize, type])

    useEffect(() => {
      const { page, pageSize } = paginationModel

      // загружает документы до тех пор, пока количество отфильтрованных документов
      // не будут соответствовать запрашиваемому количеству
      // или пока количество не изменится, что означает, что загружены все документы
      if ((page + 1) * pageSize >= filteredDocuments.length) {
        void fetchMoreDocuments(paginationModel.pageSize)
      }
      const docs = filteredDocuments.slice(
        page * pageSize,
        (page + 1) * pageSize
      )

      setRows(docs)
    }, [fetchMoreDocuments, filteredDocuments, paginationModel])

    const handleChange = useCallback(
      (newSelectionModel: GridRowSelectionModel) => {
        setSelectionModel([...newSelectionModel])
      },
      []
    )

    const handlePaginationModelChange = (
      paginationModel: GridPaginationModel
    ) => {
      setPaginationModel(paginationModel)
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
