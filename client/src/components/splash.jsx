import React from 'react';
import { connect } from 'react-redux';
import { receiveCurrentUser } from '../actions/session_actions';

class Splash extends React.Component {

  render() {
    return (
      <div>Welcome!
        <a href="https://all-aboard123.herokuapp.com/auth/google">Log In or Sign Up with Google</a>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    receiveCurrentUser: (user) => dispatch(receiveCurrentUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Splash);
