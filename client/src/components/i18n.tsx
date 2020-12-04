import { I18nBloc, I18nStates } from '@src/blocs/i18n';
import { createI18nContext } from '@src/config/create-i18n-context';
import { BlocBuilder } from '@src/modules/react-bloc';
import React from 'react';
import { SplashScreen } from './splash-screen';

export function I18n(props: {
  i18nBloc: I18nBloc;
  children: React.ReactChild;
}) {
  return (
    <BlocBuilder
      bloc={props.i18nBloc}
      builder={(state) => {
        if (state instanceof I18nStates.InitialLoading) {
          return <SplashScreen />;
        } else if (state instanceof I18nStates.Ready) {
          const I18nProvider = createI18nContext(state.translations);
          return <I18nProvider>{props.children}</I18nProvider>;
        }
        return <div />;
      }}
    />
  );
}
