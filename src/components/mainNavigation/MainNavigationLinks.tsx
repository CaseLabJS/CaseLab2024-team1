import React from 'react'
import MainNavigationList from './MainNavigationList'

interface MainNavigationLinksProps {
  isAdmin: boolean
  isAuth: boolean
  adminLinks: Array<{ text: string; path: string }>
  userLinks: Array<{ text: string; path: string }>
}

const MainNavigationLinks: React.FC<MainNavigationLinksProps> = ({
  isAdmin,
  isAuth,
  adminLinks,
  userLinks,
}) => {
  const links = isAdmin ? adminLinks : isAuth ? userLinks : []

  return <MainNavigationList links={links} />
}

export default MainNavigationLinks
