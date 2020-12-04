import { configureTheme, generateTheme } from '@src/modules/css-in-jsx';
import Color from 'color';

const palette = {
  white: 'white',
  black: 'black',
  blue: '#1E518A',
};

export const { ThemeProvider, createUseStyle, theme } = configureTheme({
  theme: generateTheme('light', {
    clickable: {
      main: Color(palette.blue).rotate(180).toString(),
      contrast: {
        main: palette.white,
      },
    },
  }),
  dimensions: {
    gutterSmall: 8,
    gutterMedium: 16,
    gutterLarge: 24,
    radiusSmall: 8,
    radiusMedium: 16,
    appBarHeight: 60,
    widthLimiter: 960,
    appBarIndex: 1000,
    breakpointSmall: 700,
  },
  createSharedStyles: (theme) => ({
    typography: {
      title: {
        fontFamily: 'Oswald',
        fontSize: 24,
        color: theme.active.contrast.strong,
      },
      h1: {
        fontSize: 24,
        color: theme.active.contrast.strong,
      },
      h2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.active.contrast.strong,
      },
      default: {
        fontSize: 16,
        color: theme.active.contrast.main,
      },
      submit: {
        color: theme.active.contrast.main,
        fontWeight: 'bold',
      },
      action: (disabled = false) => ({
        color: disabled ? theme.clickable.weak : theme.clickable.strong,
        fontWeight: 'bold',
      }),
    },
    shadow: {
      boxShadow:
        '0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 1px 3px 1px rgba(0, 0, 0, 0.16)',
    },
  }),
});
