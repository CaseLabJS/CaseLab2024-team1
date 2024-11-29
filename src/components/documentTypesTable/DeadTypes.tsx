import DocumentTypesTable from './commonComponents/DocumentTypesTable'
import { Box } from '@mui/material'

const DeadTypes: React.FC = () => {
  return (
    <Box>
      <DocumentTypesTable showOnlyAlive={false} />
    </Box>
  )
}

export default DeadTypes
