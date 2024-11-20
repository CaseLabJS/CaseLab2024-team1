import { IconButton } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useColorScheme } from '@mui/material'
const ThemeSwitch: React.FC = () => {
  const { mode, setMode } = useColorScheme()
  const SwitchThemeIcon = mode === 'dark' ? LightModeIcon : DarkModeIcon
  const changeTheme = () => {
    return mode === 'dark' ? setMode('light') : setMode('dark')
  }
  return (
    <IconButton
      aria-controls="menu-appbar"
      onClick={changeTheme}
      sx={{ height: 40, width: 40 }}
    >
      <SwitchThemeIcon />
    </IconButton>
  )
}

export default ThemeSwitch
