import { I18nBloc, I18nStates } from '@src/blocs/i18n';
import { configureI18n } from '@src/config/configure-i18n';
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
          const I18nProvider = configureI18n(state.translations);
          return <I18nProvider>{props.children}</I18nProvider>;
        }
        return <div />;
      }}
    />
  );
}
