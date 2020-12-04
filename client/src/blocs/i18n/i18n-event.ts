import { SupportedLanguages } from '@src/i18n';
import { BlocEvent } from '@src/modules/react-bloc';

export abstract class I18nEvent extends BlocEvent {}

export class ChangeLanguage extends I18nEvent {
  constructor(public lang: SupportedLanguages) {
    super();
  }
}
