import { merge } from 'lodash';
import { RECEIVE_CHARACTERS } from '../actions/character_actions';

const CharactersReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CHARACTERS:
      action.characters.forEach((character) => {
        newState[character._id] = character;
      });
      break;
    default:
    break;
  }
  return newState;
}

export default CharactersReducer;
