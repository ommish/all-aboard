import { merge } from 'lodash';

const CharactersReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    default:
    newState = state;
    break;
  }
  return newState;
}

export default CharactersReducer;
