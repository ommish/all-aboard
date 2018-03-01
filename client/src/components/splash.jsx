import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/session_actions';

class Splash extends React.Component {

  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div>Welcome!
        <a href="auth/google">Log In or Sign Up with Google</a>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  };
};

export default connect(null, mapDispatchToProps)(Splash);
