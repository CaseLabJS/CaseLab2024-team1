import React from 'react'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface MainNavigationLinkProps {
  text: string
  path: string
}

const MainNavigationLinkItem: React.FC<MainNavigationLinkProps> = ({
  text,
  path,
}) => {
  return (
    <ListItem
      disablePadding
      sx={{ width: 'fit-content', textTransform: 'uppercase' }}
    >
      <ListItemButton
        component={NavLink}
        to={path}
        sx={{
          '&.active': {
            fontWeight: 'bold',
            textDecoration: 'underline',
            textUnderlineOffset: '0.3rem',
          },
        }}
      >
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default MainNavigationLinkItem
