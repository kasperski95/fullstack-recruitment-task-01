import { ThemeBloc } from './theme-bloc';

let instance: ThemeBloc | null;

export function useThemeBloc() {
  if (instance == null) instance = new ThemeBloc();

  return instance;
}
