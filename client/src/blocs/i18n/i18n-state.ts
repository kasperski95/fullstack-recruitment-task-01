import { Translations } from '@src/i18n';
import { BlocState } from '@src/modules/react-bloc';

export abstract class I18nState extends BlocState {}

export class InitialLoading extends I18nState {}

export class Ready extends I18nState {
  constructor(public translations: Translations) {
    super();
  }
}
