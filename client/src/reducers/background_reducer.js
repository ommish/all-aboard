import { RECEIVE_COMPENDIUM } from '../actions/compendium_actions';
import { merge } from 'lodash';

const BackgroundReducer = (state, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_COMPENDIUM:
      newState = merge({}, action.backgrounds);
      break;
    default:
      break;
  }
  return newState;
};

export default BackgroundReducer;
