import { merge } from 'lodash';
import { LOGOUT } from '../actions/session_actions';

const CharactersReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case LOGOUT:
    newState = {};
    break;
    default:
    newState = state;
    break;
  }
  return newState;
}

export default CharactersReducer;
