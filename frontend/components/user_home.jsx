import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { receiveCurrentUser } from '../actions/session_actions';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <h1>Welcome {this.props.currentUser.username}!</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users[state.session.currentUser.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveCurrentUser: (user) => dispatch(receiveCurrentUser(user)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
