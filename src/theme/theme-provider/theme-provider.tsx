import {ReactNode} from 'react';
import {ThemeProvider as MUIThemeProvider} from "@mui/material/styles";
import {Pallete} from "../theme";

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
    const theme = Pallete["dark"];

    return (
        <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    );
};