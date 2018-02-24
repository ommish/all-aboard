import React from 'react';
import { connect } from 'react-redux';
import { receiveCurrentUser, logout } from '../actions/session_actions';

class UserHome extends React.Component {

  render() {
    return (
      <main>
        <h1>Welcome {this.props.currentUser.displayName}!</h1>
        <a href="/api/logout" onClick={this.props.logout}>Log Out</a>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users[state.session.currentUser._id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveCurrentUser: (user) => dispatch(receiveCurrentUser(user)),
    logout: () => dispatch(logout()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
