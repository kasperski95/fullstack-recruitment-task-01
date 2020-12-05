import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './config/routes';
import { Home } from './screens/home/home';

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={routes.details}
          render={({ location }) => {
            const queryVariables = new URLSearchParams(location.search);
            const noteId = queryVariables.get('n');
            return <Home noteId={noteId} />;
          }}
        />
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
