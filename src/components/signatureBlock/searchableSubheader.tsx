import React, { useState } from 'react'
import {
  Box,
  IconButton,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { SearchableSubheaderProps } from './types'

export const SearchableSubheader: React.FC<SearchableSubheaderProps> = ({
  onSearch,
  sx,
}) => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const toggleSearch = () => {
    setShowSearch((prev) => !prev)
    if (showSearch) {
      setSearchValue('')
      if (onSearch) onSearch('')
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchValue(value)
    if (onSearch) onSearch(value)
  }

  return (
    <ListSubheader component="div" disableSticky sx={sx}>
      <Stack spacing={1}>
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1" component="span" flexGrow={1}>
            Выберите вариант подписи
          </Typography>
          <IconButton
            type="button"
            aria-label={showSearch ? 'close search' : 'open search'}
            size="small"
            onClick={toggleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        {showSearch && (
          <TextField
            label="Поиск"
            variant="outlined"
            size="small"
            fullWidth
            autoFocus
            value={searchValue}
            onChange={handleSearchChange}
          />
        )}
      </Stack>
    </ListSubheader>
  )
}
