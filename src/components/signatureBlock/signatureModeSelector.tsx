import { Button, Menu, MenuItem } from '@mui/material'
import { FC, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { modesMap } from './constants'
import { Modes, SignatureModeSelectorProps } from './types'

export const SignatureModeSelector: FC<SignatureModeSelectorProps> = ({
  selectMode,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSelectMode = (mode: Modes) => {
    selectMode(mode)
    handleClose()
  }

  return (
    <>
      <Button onClick={handleClick} variant="contained">
        <ArrowDropDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.entries(modesMap).map(([key, label]) => (
          <MenuItem key={key} onClick={() => handleSelectMode(key as Modes)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
