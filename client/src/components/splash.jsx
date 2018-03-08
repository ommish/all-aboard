import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/session_actions';

class Splash extends React.Component {

  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <main>
        <h2>All Aboard the Express Train! This app was built with Express and Create React App.</h2>
      </main>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  };
};

export default connect(null, mapDispatchToProps)(Splash);
