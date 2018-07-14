import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { charactersByUser } from '../../util/selectors';
import { fetchCharacters, deleteCharacter } from '../../actions/character_actions';

class CharacterIndex extends React.Component {
  componentDidMount() {
    this.props.fetchCharacters();
  }
  render() {
    const characters = this.props.characters.map((character, i) => {
      return (
        <li key={i}>
          {i + 1}. <Link to={`/characters/${character._id}`}>{character.name}</Link>
          <button onClick={(e) => this.props.deleteCharacter(character._id)} className="remove-button tiny-button">✘</button>
        </li>
      );
    });
    return (
      <section>
        <button className="plain-button"><Link to="/characters/new">Create New Character</Link></button>
        <ul>
          {characters}
        </ul>
      </section>
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
    deleteCharacter: (characterId) => dispatch(deleteCharacter(characterId)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CharacterIndex);
