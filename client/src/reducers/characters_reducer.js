import { merge } from 'lodash';

const CharactersReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    default:
    break;
  }
  return newState;
}

export default CharactersReducer;
