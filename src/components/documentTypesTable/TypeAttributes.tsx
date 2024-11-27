import { Attribute } from '@/types/sharedTypes'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import { TableCell, Table, TableRow, TableHead, TableBody } from '@mui/material'

interface TypeAttributeProps {
  attributes: Attribute[]
}

const TypeAttributes = (props: TypeAttributeProps) => {
  const attributes = props.attributes
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Обязательный</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attributes.map((attribute) => (
            <TableRow key={attribute.id}>
              <TableCell>{attribute.id}</TableCell>
              <TableCell>{attribute.name}</TableCell>
              <TableCell>
                {attribute.required ? <CheckIcon /> : <CloseIcon />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TypeAttributes
