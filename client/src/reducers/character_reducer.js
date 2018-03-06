import { merge } from 'lodash';
import { RECEIVE_CHARACTERS, RECEIVE_CHARACTER, REMOVE_CHARACTER } from '../actions/character_actions';

const CharacterReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CHARACTERS:
      action.characters.forEach((character) => {
        newState[character._id] = character;
      });
      break;
    case RECEIVE_CHARACTER:
      newState[action.character._id] = action.character;
      break;
    case REMOVE_CHARACTER:
      delete newState[action.characterId];
      break;
    default:
    break;
  }
  return newState;
};

export default CharacterReducer;
