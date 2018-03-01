import { connect } from 'react-redux';
import { updateCharacter } from '../../actions/character_actions';
import CharacterSheet from './character_sheet';

const mapStateToProps = (state, ownProps) => {
  const characterId = ownProps.match.params.characterId;
  const character = state.characters[characterId];
  const editable = character ? character._user ===  state.session.currentUser.id : false;
  return {
    currentUser: state.session.currentUser,
    character,
    editable,
    races: state.races,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCharacter: (character) => dispatch(updateCharacter(character)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSheet);
