import React from 'react'
import MainNavigationLinkItem from './MainNavigationLinkItem'

interface MainNavigationListProps {
  links: Array<{ text: string; path: string }>
}

const MainNavigationList: React.FC<MainNavigationListProps> = ({ links }) => {
  return (
    <>
      {links.map((link) => (
        <MainNavigationLinkItem
          key={link.text}
          text={link.text}
          path={link.path}
        />
      ))}
    </>
  )
}

export default MainNavigationList
