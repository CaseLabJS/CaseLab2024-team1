import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from '@mui/material'
import { AttributeTableProps } from './types'
const AttributeTable = (props: AttributeTableProps) => {
  const { refObj, attributes, checkedIds, register, handleSelect } = props
  return (
    <>
      <Box
        sx={{
          maxHeight: {
            xs: '200px',
            md: '400px',
            lg: '500px',
          },
          overflowY: 'auto',
          mb: '2rem',
          width: '100%',
        }}
      >
        <Table
          size="small"
          sx={{
            '.MuiTableCell-root': {
              fontSize: { xs: '12px', md: '14px', lg: '14px' },
              padding: { xs: '2px' },
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Имя</TableCell>
              <TableCell align="center">Обяз.</TableCell>
              <TableCell align="center">Выбрано</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {attributes.map((attribute) => {
              return (
                <TableRow
                  key={
                    attribute.data.id < -Infinity
                      ? String(refObj) /* "no unused variables" */
                      : attribute.data.id
                  }
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    maxHeight: 20,
                  }}
                >
                  <TableCell align="center">{attribute.data.id}</TableCell>
                  <TableCell align="center">{attribute.data.name}</TableCell>
                  <TableCell align="center">
                    {attribute.data.required ? 'Да' : 'Нет'}
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      {...register('attributeIds')}
                      value={attribute.data.id}
                      checked={checkedIds.includes(attribute.data.id)}
                      onChange={() => handleSelect(attribute.data.id)}
                    ></Checkbox>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  )
}
export default AttributeTable
