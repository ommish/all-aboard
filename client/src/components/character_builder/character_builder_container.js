import { connect } from 'react-redux';
import { createCharacter } from '../../actions/character_actions';
import CharacterBuilder from './character_builder';

const mapStateToProps = (state, ownProps) => {
  const characterId = ownProps.match.params.characterId;
  return {
    currentUser: state.session.currentUser,
    races: state.races,
    charClasses: state.charClasses,
    backgrounds: state.backgrounds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCharacter: (data) => dispatch(createCharacter(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterBuilder);
