import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import { ThemeEvents, useThemeBloc } from './blocs/theme';
import { UserEvents, UserStates, useUserBloc } from './blocs/user';
import { SplashScreen } from './components/splash-screen';
import { ThemeChanger } from './components/theme-changer';
import {
  configureConnectionUtils,
  _configureConnectionUtils,
} from './config/configure-connection-utils';
import { configureApollo } from './config/configure-graphql';
import { ThemeProvider } from './config/theme';
import { me } from './gql/me';
import { User } from './models/user';
import { Bloc, BlocBuilder } from './modules/react-bloc';
import { Router } from './router';

export function App() {
  Bloc.logger = console;

  const userBloc = useUserBloc(async (jwt) => {
    const { gql } = _configureConnectionUtils(jwt);
    return (await gql(me(undefined))) as User;
  });
  const themeBloc = useThemeBloc();

  userBloc.dispatch(new UserEvents.Init());
  themeBloc.dispatch(new ThemeEvents.Init());

  return (
    <ThemeProvider>
      <ThemeChanger>
        <ApolloProvider client={configureApollo(userBloc.jwt)}>
          <BlocBuilder
            bloc={userBloc}
            builder={(state) => {
              if (state instanceof UserStates.Identifying)
                return <SplashScreen />;
              else if (state instanceof UserStates.Authenticated) {
                const { ConnectionProvider } = configureConnectionUtils(
                  state.jwt
                );
                return (
                  <ConnectionProvider>
                    <Router />
                  </ConnectionProvider>
                );
              }
              const { ConnectionProvider } = configureConnectionUtils();
              return (
                <ConnectionProvider>
                  <Router />
                </ConnectionProvider>
              );
            }}
          />
        </ApolloProvider>
      </ThemeChanger>
    </ThemeProvider>
  );
}
