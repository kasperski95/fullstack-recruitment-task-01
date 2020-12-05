import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { I18nEvents, useI18nBloc } from './blocs/i18n';
import { ThemeEvents, useThemeBloc } from './blocs/theme';
import { I18n } from './components/i18n';
import { ThemeChanger } from './components/theme-changer';
import { configureConnectionUtils } from './config/configure-connection-utils';
import { configureApollo } from './config/configure-graphql';
import { useConfigureStore } from './config/configure-store';
import { ThemeProvider } from './config/theme';
import { Bloc } from './modules/react-bloc';
import { Router } from './router';

export function App() {
  const i18nBloc = useI18nBloc();
  const themeBloc = useThemeBloc();

  React.useEffect(() => {
    Bloc.logger = console;
    themeBloc.dispatch(new ThemeEvents.Load());
    i18nBloc.dispatch(new I18nEvents.ChangeLanguage('en'));
  }, [themeBloc, i18nBloc]);

  const { ConnectionProvider } = configureConnectionUtils();
  const { StoreProvider } = useConfigureStore();
  return (
    <ThemeProvider>
      <ThemeChanger>
        <I18n i18nBloc={i18nBloc}>
          <StoreProvider>
            <ApolloProvider client={configureApollo()}>
              <ConnectionProvider>
                <Router />
              </ConnectionProvider>
            </ApolloProvider>
          </StoreProvider>
        </I18n>
      </ThemeChanger>
    </ThemeProvider>
  );
}
