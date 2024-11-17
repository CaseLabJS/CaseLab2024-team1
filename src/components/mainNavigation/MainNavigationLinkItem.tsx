import React from 'react'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

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
      <ListItemButton component={Link} to={path}>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default MainNavigationLinkItem
