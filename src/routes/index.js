import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ROUTES } from './routes';

/**
 * aqui é onde as rotas sao mapeadas
 * as rotas tambem poderiam ter subrotas caso necessario
 */
export default function Routes() {
  const routes = ROUTES;
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => <route.component {...props} />}
          />
        ))}
        <Route component={() => <h1>Página não encontrada</h1>} />
      </Switch>
    </Router>
  );
}
