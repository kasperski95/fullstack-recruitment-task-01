import { getTranslations, Translations } from '@src/i18n';
import { Bloc } from '@src/modules/react-bloc';
import * as I18nEvents from './i18n-event';
import * as I18nStates from './i18n-state';

export class I18nBloc extends Bloc<I18nEvents.I18nEvent, I18nStates.I18nState> {
  constructor() {
    super(new I18nStates.InitialLoading());
  }

  private translations: Translations | undefined;

  async *mapEventToState(event: I18nEvents.I18nEvent) {
    if (event instanceof I18nEvents.ChangeLanguage) {
      this.translations = await getTranslations(event.lang);
      yield new I18nStates.Ready(this.translations);
    }
  }
}
