import DocumentTypesTable from './commonComponents/DocumentTypesTable'
import { Box } from '@mui/material'

const AliveTypes: React.FC = () => {
  return (
    <Box>
      <DocumentTypesTable showOnlyAlive={true} />
    </Box>
  )
}

export default AliveTypes
