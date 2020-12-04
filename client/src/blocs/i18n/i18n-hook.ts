import { I18nBloc } from './i18n-bloc';

let instance: I18nBloc | null;

export function useI18nBloc() {
  if (instance == null) instance = new I18nBloc();

  return instance;
}
