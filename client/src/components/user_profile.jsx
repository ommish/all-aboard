import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCompendium } from '../actions/compendium_actions';

class UserHome extends React.Component {

	componentDidMount() {
		this.props.fetchCompendium();
	}

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

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCompendium: () => dispatch(fetchCompendium()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
