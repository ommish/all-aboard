import React from 'react';
import { connect } from 'react-redux';

const Header = ({loggedIn, currentUser}) => {
  let welcome, authLink;
  if (loggedIn) {
    welcome = <h1>Welcome, {currentUser.displayName}!</h1>;
    authLink = <button className="plain-button"><a href="/api/logout">Log Out</a></button>
  } else {
    welcome = <div><h1>All Aboard!</h1>We make DnD character set up super easy. Try it out!</div>;
    authLink = <button className="plain-button"><a href="/auth/google">Log In or Sign Up with Google</a></button>;
  }
  return (
    <header>
      {welcome}
      {authLink}
    </header>
  );
};

const mapStateToProps = (state) => {
  const loggedIn = Boolean(state.session.currentUser);
  const currentUser = loggedIn ? state.users[state.session.currentUser._id] : null;
  return {
    loggedIn,
    currentUser,
  };
};

export default connect(mapStateToProps)(Header);
