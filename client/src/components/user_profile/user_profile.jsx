import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { fetchCompendium } from '../../actions/compendium_actions';
import CharacterIndex from './character_index';
import './user_profile.css';

class UserHome extends React.Component {
	componentDidMount() {
		this.props.fetchCompendium();
	}

	render() {
		return (
			<main className="user-main">
				<Route
					exact
					path="/users/:userId/characters"
					component={CharacterIndex}
				/>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.users[state.session.currentUser._id]
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCompendium: () => dispatch(fetchCompendium())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
