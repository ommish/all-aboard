import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { receiveCurrentUser } from '../actions/session_actions';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // check cookies here- if currentUser exists, dispatch receive current user and clear cookies
    // else chill
  }

  render() {

    if (this.props.currentUser) {
      return (
        <h1>Welcome!</h1>
      );
    } else {
      return (
        <div>
          <a href="auth/google">Log In with Google+</a>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveCurrentUser: (user) => dispatch(receiveCurrentUser(user)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
