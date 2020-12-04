import { Translations } from '@src/i18n';
import React from 'react';

interface I18nContext {
  translations: Translations;
}

let TranslationContext: React.Context<I18nContext>;

export function createI18nContext(translations: Translations) {
  TranslationContext = React.createContext({ translations });
  return (props: { children: React.ReactChild }) => (
    <TranslationContext.Provider value={{ translations }}>
      {props.children}
    </TranslationContext.Provider>
  );
}

export function useI18n() {
  return React.useContext(TranslationContext);
}
