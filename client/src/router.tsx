import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './config/routes';
import { Home } from './screens/home/home';

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
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
