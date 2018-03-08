import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({currentUser}) => {
  return (
    <nav key={1} className="user-nav">
      <NavLink exact to={`/users/${currentUser._id}`}>Home</NavLink>
      <NavLink exact to={`/users/${currentUser._id}/characters`}>My Characters</NavLink>
    </nav>
  );
};

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.users[state.session.currentUser._id];
  return {
    currentUser,
  };
};

export default connect(mapStateToProps)(Nav);
