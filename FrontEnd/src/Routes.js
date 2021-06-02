import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Produto as ProdutoView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Manter as ManterView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Route
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={ProdutoView}
        exact
        layout={MainLayout}
        path="/"
      />
      <RouteWithLayout
        component={ProdutoView}
        exact
        layout={MainLayout}
        path="/produto"
      />
      <RouteWithLayout
        component={ManterView}
        exact
        layout={MainLayout}
        path="/produto/manter/:id?"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
