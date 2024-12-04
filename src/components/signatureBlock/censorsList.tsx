import { MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material'
import { FC } from 'react'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Avatar } from '@mui/material'
import { Person } from '@mui/icons-material'
import { CensorsListProps } from './types'

export const CensorsList: FC<CensorsListProps> = ({
  censors,
  onCensorSelect,
  selected,
  sx,
}) => {
  return (
    <Box sx={sx}>
      {censors.map((user) => (
        <MenuItem key={user.userData.id} onClick={() => onCensorSelect(user)}>
          <ListItemIcon>
            {selected ? (
              <CheckBoxIcon fontSize="small" />
            ) : (
              <CheckBoxOutlineBlankIcon fontSize="small" />
            )}
          </ListItemIcon>
          <Avatar
            sx={{ bgcolor: 'primary.main', width: 24, height: 24, mr: 1 }}
          >
            <Person />
          </Avatar>
          <ListItemText
            primary={`${user.userData.name} ${user.userData.surname}`}
            primaryTypographyProps={{
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          />
        </MenuItem>
      ))}
    </Box>
  )
}
