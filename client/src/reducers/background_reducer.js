import { RECEIVE_COMPENDIUM } from '../actions/compendium_actions';
import { merge } from 'lodash';

const BackgroundReducer = (state, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_COMPENDIUM:
      newState = merge({}, action.backgrounds);
      for (const bgId in newState) {
        newState[bgId].skillProficiencies = JSON.parse(newState[bgId].skillProficiencies);
        newState[bgId].toolProficiencies = JSON.parse(newState[bgId].toolProficiencies);
        newState[bgId].languages = JSON.parse(newState[bgId].languages);
        newState[bgId].equipment = JSON.parse(newState[bgId].equipment);
      }
      break;
    default:
      break;
  }
  return newState;
};

export default BackgroundReducer;
