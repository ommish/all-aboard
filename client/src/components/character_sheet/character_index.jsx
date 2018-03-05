import React from 'react';
import { connect } from 'react-redux';
import { charactersByUser } from '../../util/selectors';
import { fetchCharacters, createCharacter } from '../../actions/character_actions';
import { Link } from 'react-router-dom';

class CharacterIndex extends React.Component {
  componentDidMount() {
    this.props.fetchCharacters();
  }
  render() {
    const characters = this.props.characters.map((character, i) => {
      return (
        <li key={i}>
          <Link to={`/characters/${character._id}`}>{character.name}</Link>
        </li>
      );
    });
    return (
      <main>
        <Link to={`/users/${this.props.match.params.userId}/new-character`}>Create New Character</Link>
        <button onClick={() => this.props.createCharacter({})}>CREATE CHARACTER</button>
        <ul>
          {characters}
        </ul>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    characters: charactersByUser(state, ownProps.match.params.userId),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    fetchCharacters: () => dispatch(fetchCharacters(ownProps.match.params.userId)),
    createCharacter: (data) => dispatch(createCharacter(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CharacterIndex);
