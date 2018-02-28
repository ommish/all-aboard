import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class UserHome extends React.Component {

	render() {
		return (
			<header>
				<h1>Welcome {this.props.currentUser.displayName}!</h1>
				<a href="/api/logout">Log Out</a>
        <nav>
          <NavLink to={`/users/${this.props.currentUser._id}/characters`}>My Characters</NavLink>
        </nav>
			</header>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.users[state.session.currentUser._id],
	};
};

export default connect(mapStateToProps)(UserHome);
