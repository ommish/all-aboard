import { merge } from 'lodash';
import { RECEIVE_CHARACTERS, RECEIVE_CHARACTER } from '../actions/character_actions';

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
    default:
    break;
  }
  return newState;
};

export default CharacterReducer;
