// import attributeListStore from '@/stores/AttributeListStore'
import { DocumentType } from '@/types/sharedTypes'
import { Paper } from '@mui/material'
import { observer } from 'mobx-react-lite'
// import { useState } from 'react'
interface EditDocumentTypeProps {
  type: DocumentType
}
const EditDocumentType = observer((props: EditDocumentTypeProps) => {
  /* TODO: add editTypeComponent
    const { attributes } = attributeListStore
  const [typeValues, setTypeValue] = useState<DocumentType>(props.type)
  */
  return (
    <Paper
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      {props.type.name}
    </Paper>
  )
})

export default EditDocumentType
