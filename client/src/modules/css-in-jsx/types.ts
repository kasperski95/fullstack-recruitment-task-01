export interface Color {
  main: string;
}

export interface ColorWithContrast extends Color {
  contrast: Color;
}

export interface ColorGroup extends Color {
  weak: string;
  strong: string;
  light: string;
  dark: string;
}

export interface ColorGroupWithContrast extends ColorGroup {
  contrast: ColorGroup;
}

export interface MiniTheme extends ColorGroup {
  contrast: ColorGroup;
}

export interface MediumTheme extends MiniTheme {
  divider: Color;
  success: ColorWithContrast;
  error: ColorGroupWithContrast;
  warning: ColorWithContrast;
}

export interface ThemeCore {
  light: MediumTheme;
  dark: MediumTheme;
  clickable: MediumTheme;
  accent: MediumTheme;
}

export type Themes = keyof ThemeCore;

export interface Theme extends ThemeCore {
  active: MediumTheme;
}

export interface Style {
  [key: string]: React.CSSProperties | ((...args: any) => React.CSSProperties);
}

export type UnlimitedDepthStyle = {
  [key: string]:
    | React.CSSProperties
    | ((...args: any) => React.CSSProperties)
    | UnlimitedDepthStyle;
};

export interface StylingCore<T extends Style, D> {
  theme: Theme;
  dimensions: D;
  createSharedStyles: (theme: Theme) => T;
}

export interface Styling<S extends Style, T extends Style, D> {
  styles: S;
  theme: Theme;
  dimensions: D;
  typography: T;
}
