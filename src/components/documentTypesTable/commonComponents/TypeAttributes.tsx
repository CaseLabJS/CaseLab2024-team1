import { TypeAttributeProps } from '../types'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import {
  TableCell,
  Table,
  TableRow,
  TableHead,
  TableBody,
  Box,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const TypeAttributes = (props: TypeAttributeProps) => {
  const attributes = props.attributes
  const [collapseOpen, setCollapseOpen] = useState(false)
  return (
    <Box>
      {attributes.length ? (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setCollapseOpen(!collapseOpen)}
            >
              {collapseOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
            <Typography variant="subtitle2" sx={{ mx: '10px' }}>
              {attributes.length}:
            </Typography>
            {attributes.map((attribute, index) => {
              if (index < 2)
                return (
                  <Typography key={attribute.id} variant="subtitle2">
                    {attribute.name}
                    {index === 0 && attributes.length > 1 ? ',' : ''}
                    {index === 1 && attributes.length > 2 ? '...' : ''}
                  </Typography>
                )
            })}
          </Box>
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Название</TableCell>
                  <TableCell>Обязательный</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attributes.map((attribute) => (
                  <TableRow
                    sx={{
                      '&:last-child td': {
                        borderBottom: 0,
                      },
                    }}
                    key={attribute.id}
                  >
                    <TableCell>{attribute.id}</TableCell>
                    <TableCell>{attribute.name}</TableCell>
                    <TableCell>
                      {attribute.required ? <CheckIcon /> : <CloseIcon />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </>
      ) : (
        <Typography variant="subtitle2" textAlign="center">
          Атрибуты отсутствуют
        </Typography>
      )}
    </Box>
  )
}

export default TypeAttributes
