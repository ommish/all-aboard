import { connect } from 'react-redux';
import CharacterSheet from './character_sheet';

const mapStateToProps = (state, ownProps) => {
  const characterId = ownProps.match.params.characterId;
  const character = state.characters[characterId];
  const editable = character ? character.userId : null;
  return {
    character,
    editable,
  };
};

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, null)(CharacterSheet);
