import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserPrivileges, useUserBloc } from './blocs/user';
import { routes } from './config/routes';
import { Home } from './screens/home/home';
import { LoginScreen } from './screens/login/login-screen';
import { RegistrationScreen } from './screens/registration/registration-screen';

export function Router() {
  const userBloc = useUserBloc();

  return (
    <BrowserRouter>
      <Switch>
        {userBloc.isAuthorized(UserPrivileges.seeLogin) && (
          <Route
            exact
            path={routes.login}
            render={() => {
              return <LoginScreen />;
            }}
          />
        )}
        {userBloc.isAuthorized(UserPrivileges.seeRegistration) && (
          <Route
            exact
            path={routes.register}
            render={() => {
              return <RegistrationScreen />;
            }}
          />
        )}

        <Route
          path={routes.home}
          render={({ location }) => {
            return <Home />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}
