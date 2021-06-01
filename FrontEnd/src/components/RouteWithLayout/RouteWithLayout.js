import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from "../../actions/auth";
import { ErrorBoundary } from '../index';


const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        isAuthenticated() ? (
          <Layout>
            <ErrorBoundary>
              <Component {...matchProps} />
            </ErrorBoundary>
          </Layout>
        ) : (
            <Redirect to={{ pathname: "/sign-in", state: { from: props.location } }} />
          )
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
