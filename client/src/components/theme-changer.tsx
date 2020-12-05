import { ThemeStates, useThemeBloc } from '@src/blocs/theme';
import { createUseStyle, ThemeProvider } from '@src/config/theme';
import { Themes } from '@src/modules/css-in-jsx';
import { BlocBuilder } from '@src/modules/react-bloc';
import Color from 'color';
import React from 'react';

export function ThemeChanger(props: { children: React.ReactChild }) {
  const [themeName, setThemeName] = React.useState('light' as Themes);
  const { theme } = useStyle(themeName);
  const themeBloc = useThemeBloc();

  React.useLayoutEffect(() => {
    document.body.style.color = theme.active.contrast.main;

    const root = document.documentElement;
    root.style.setProperty('--scrollbar-thumb-color', theme.accent.strong);
    root.style.setProperty(
      '--scrollbar-track-color',
      Color(theme.accent.weak).mix(Color(theme.active.weak), 0.5).toString()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.activeName]);

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
