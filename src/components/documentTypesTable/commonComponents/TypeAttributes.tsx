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
            }}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              sx={{ p: 0, height: '20px', width: '20px' }}
              onClick={() => setCollapseOpen(!collapseOpen)}
            >
              {collapseOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
            <Typography
              variant="subtitle2"
              sx={{
                mx: '10px',
                fontSize: { xs: '11px', md: '14px', lg: '14px' },
              }}
            >
              {attributes.length}:
            </Typography>
            {attributes.map((attribute, index) => {
              if (index < 2)
                return (
                  <Typography
                    sx={{ fontSize: { xs: '10px', md: '14px', lg: '14px' } }}
                    key={attribute.id}
                    variant="subtitle2"
                  >
                    {attribute.name}
                    {index === 0 && attributes.length > 1 ? (
                      <span>,&nbsp;</span>
                    ) : (
                      ''
                    )}
                    {index === 1 && attributes.length > 2 ? '...' : ''}
                  </Typography>
                )
            })}
          </Box>
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <Table
              size="small"
              sx={{
                mt: '8px',
                '.MuiTableCell-root': {
                  fontSize: { xs: '10px', md: '14px', lg: '14px' },
                  padding: { xs: '2px' },
                },
              }}
            >
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
                      {attribute.required ? (
                        <CheckIcon
                          sx={{ width: { xs: '16px', md: '24px', lg: '24px' } }}
                        />
                      ) : (
                        <CloseIcon
                          sx={{ width: { xs: '16px', md: '24px', lg: '24px' } }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </>
      ) : (
        <Typography
          variant="subtitle2"
          textAlign="center"
          sx={{ fontSize: { xs: '11px', md: '14px', lg: '14px' } }}
        >
          Атрибуты отсутствуют
        </Typography>
      )}
    </Box>
  )
}

export default TypeAttributes
