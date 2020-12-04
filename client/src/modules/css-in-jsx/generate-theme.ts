import Color from 'color';
import { ColorGroupWithContrast, MediumTheme, Theme, ThemeCore } from './types';

const palette = {
  white: '#c0c0c0',
  black: '#202020',
  red: '#cc1111',
  green: 'green',
  orange: 'orange',
};

function generateColorGroupWithContrast(
  main: string,
  contrastMain: string,
  darkMode: boolean
): ColorGroupWithContrast {
  const contrast = 0.75;

  const increaseContrast = (
    color: string,
    value: number,
    darkMode: boolean
  ) => {
    if (Color(main).saturationv() < 20) {
      return (darkMode
        ? Color(color).darken(value)
        : Color(color).lighten(value)
      ).toString();
    } else {
      return (value < 0
        ? Color(color).lighten(-value).saturate(value)
        : Color(color).lighten(value)
      ).toString();
    }
  };

  return {
    main: main,
    weak: Color(main).mix(Color(contrastMain), 0.4).toString(),
    strong: increaseContrast(main, contrast, darkMode),
    light: Color(main).lighten(contrast).toString(),
    dark: Color(main).darken(contrast).toString(),

    contrast: {
      main: contrastMain,
      weak: Color(contrastMain).mix(Color(main), 0.4).toString(),
      strong: increaseContrast(contrastMain, -contrast, Color(main).isDark()),
      light: Color(contrastMain).lighten(contrast).toString(),
      dark: Color(contrastMain).darken(contrast).toString(),
    },
  };
}

function generateMediumTheme(main: string, contrastMain: string): MediumTheme {
  return {
    ...generateColorGroupWithContrast(main, contrastMain, Color(main).isDark()),
    divider: {
      main: Color(main).mix(Color(contrastMain), 0.2).toString(),
    },
    success: {
      main: Color(palette.green).mix(Color(main), 0.2).toString(),
      contrast: {
        main: Color(palette.white).toString(),
      },
    },
    error: generateColorGroupWithContrast(
      '#990000',
      '#eee',
      Color(main).isDark()
    ),
    warning: {
      main: Color(palette.orange).mix(Color(main), 0.2).toString(),
      contrast: {
        main: Color(palette.black).toString(),
      },
    },
  };
}

export function generateTheme(
  active: keyof ThemeCore,
  theme: {
    clickable: { main: string; contrast: { main: string } };
  }
): Theme {
  return {
    get active() {
      return this[active];
    },
    light: generateMediumTheme(palette.white, palette.black),
    dark: generateMediumTheme(palette.black, palette.white),
    clickable: generateMediumTheme(
      theme.clickable.main,
      theme.clickable.contrast.main
    ),
    accent: generateMediumTheme(
      Color(theme.clickable.main).hue(180).toString(),
      theme.clickable.contrast.main
    ),
  };
}
