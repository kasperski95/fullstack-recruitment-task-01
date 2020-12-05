import { ThemeStates, useThemeBloc } from '@src/blocs/theme';
import { createUseStyle, ThemeProvider } from '@src/config/theme';
import { Themes } from '@src/modules/css-in-jsx';
import { BlocBuilder } from '@src/modules/react-bloc';
import React from 'react';

export function ThemeChanger(props: { children: React.ReactChild }) {
  const [themeName, setThemeName] = React.useState('light' as Themes);
  const { theme } = useStyle(themeName);
  const themeBloc = useThemeBloc();

  React.useLayoutEffect(() => {
    document.body.style.color = theme.active.contrast.main;
  }, [theme.active.contrast.main]);

  return (
    <ThemeProvider theme={theme}>
      <BlocBuilder
        bloc={themeBloc}
        listener={(state) => {
          if (state instanceof ThemeStates.Light) {
            setThemeName('light');
          } else if (state instanceof ThemeStates.Dark) {
            setThemeName('dark');
          }
        }}
        builder={() => <React.Fragment>{props.children}</React.Fragment>}
      />
    </ThemeProvider>
  );
}

const useStyle = createUseStyle(({ theme, dimensions, shared }) => ({}));
