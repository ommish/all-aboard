import { merge } from 'lodash';

const CharactersReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    default:
    return state;
  }
  return newState;
}

export default CharactersReducer;
