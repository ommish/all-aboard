import { RECEIVE_COMPENDIUM } from '../actions/compendium_actions';
import { merge } from 'lodash';

const ClassReducer = (state, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_COMPENDIUM:
      newState = merge({}, action.charClasses);
      break;
    default:
      break;
  }
  return newState;
};

export default ClassReducer;
