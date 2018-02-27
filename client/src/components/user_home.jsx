import React from 'react';
import { connect } from 'react-redux';
import { fetchCharacters, createCharacter } from '../actions/character_actions';
// import { Character } from './character';

class UserHome extends React.Component {

  componentDidMount() {
    this.props.fetchCharacters();
  }
	render() {
		return (
			<main>
				<h1>Welcome {this.props.currentUser.displayName}!</h1>
				<a href="/api/logout">Log Out</a>
        <button onClick={() => this.props.createCharacter({})}>CREATE CHARACTER</button>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.users[state.session.currentUser._id],
    characters: state.characters
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    fetchCharacters: () => dispatch(fetchCharacters(ownProps.match.params.userId)),
    createCharacter: (data) => dispatch(createCharacter(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
