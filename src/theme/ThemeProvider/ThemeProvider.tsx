import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { Palette } from '../theme';
import { PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';

export const ThemeProvider = observer(({ children }: PropsWithChildren) => {
  const theme = Palette['dark'];

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
});
