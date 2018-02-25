import React from 'react';
import { connect } from 'react-redux';
import { receiveCurrentUser } from '../actions/session_actions';

class UserHome extends React.Component {

  render() {
    return (
      <main>
        <h1>Welcome {this.props.currentUser.displayName}!</h1>
        <a href="/api/logout">Log Out</a>
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
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
