import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, currentUserId, ...props}) => {
  return (
    <Route path={path} render={(props) => (
        !loggedIn? (
          <Component {...props} />
        ) : (
          <Redirect to={`/users/${currentUserId}`} />
        )
      )} />
  );
};

const Protected = ({component: Component, path, loggedIn, ...props}) => {
  return (
    <Route path={path} render={(props) => (
        loggedIn ? (
          <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        )
      } />
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.currentUser ? state.session.currentUser._id : null,
    loggedIn: Boolean(state.session.currentUser),
  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
