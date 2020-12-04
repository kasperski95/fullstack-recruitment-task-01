import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import {
  Style,
  StylingCore,
  Theme,
  ThemeCore,
  UnlimitedDepthStyle,
} from './types';

export function configureTheme<T extends UnlimitedDepthStyle, D>(data: {
  theme: Theme;
  dimensions: D;
  createSharedStyles: (theme: Theme) => T;
}) {
  const ThemeContext = React.createContext({} as StylingCore<T, D>);

  return {
    theme: data.theme,
    ThemeProvider: (props: { children: React.ReactNode; theme?: Theme }) => {
      const theme = props.theme || data.theme;
      return (
        <ThemeContext.Provider value={{ ...data, theme }}>
          <ThemeProvider
            theme={createMuiTheme({
              palette: {
                text: {
                  primary: theme.active.contrast.main,
                  secondary: theme.active.contrast.weak,
                },
                primary: { main: theme.clickable.main },
                background: {
                  default: theme.active.dark,
                  paper: theme.active.light,
                },
                error: { main: theme.active.error.main },
                success: { main: theme.active.success.main },
                warning: { main: theme.active.warning.main },
                type: theme.active === theme.dark ? 'dark' : 'light',
                divider: theme.active.divider.main,
              },
            })}
          >
            {props.children}
          </ThemeProvider>
        </ThemeContext.Provider>
      );
    },
    createUseStyle<S extends Style>(
      createStyle: (styles: { theme: Theme; dimensions: D; shared: T }) => S
    ) {
      return (themeName?: keyof ThemeCore) => {
        const { theme, dimensions, createSharedStyles } = React.useContext(
          ThemeContext
        );

        const newTheme = themeName
          ? {
              ...theme,
              get active() {
                return theme[themeName!];
              },
            }
          : theme;

        const sharedStyles = createSharedStyles(newTheme);

        return {
          theme: newTheme,
          dimensions,
          shared: sharedStyles,
          styles: createStyle({
            theme: newTheme,
            dimensions,
            shared: sharedStyles,
          }),
        };
      };
    },
  };
}
