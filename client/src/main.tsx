import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { I18nEvents, useI18nBloc } from './blocs/i18n';
import { ThemeEvents, useThemeBloc } from './blocs/theme';
import { I18n } from './components/i18n';
import { ThemeChanger } from './components/theme-changer';
import { configureConnectionUtils } from './config/configure-connection-utils';
import { configureApollo } from './config/configure-graphql';
import { ThemeProvider } from './config/theme';
import { Bloc } from './modules/react-bloc';
import { Router } from './router';

export function App() {
  Bloc.logger = console;
  const i18nBloc = useI18nBloc();
  const themeBloc = useThemeBloc();
  themeBloc.dispatch(new ThemeEvents.Init());
  i18nBloc.dispatch(new I18nEvents.ChangeLanguage('en'));

  const { ConnectionProvider } = configureConnectionUtils();

  return (
    <ThemeProvider>
      <ThemeChanger>
        <I18n i18nBloc={i18nBloc}>
          <ApolloProvider client={configureApollo()}>
            <ConnectionProvider>
              <Router />
            </ConnectionProvider>
          </ApolloProvider>
        </I18n>
      </ThemeChanger>
    </ThemeProvider>
  );
}
