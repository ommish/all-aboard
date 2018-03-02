import { RECEIVE_COMPENDIUM } from '../actions/compendium_actions';
import { merge } from 'lodash';

const RaceReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_COMPENDIUM:
      newState = merge({}, action.races);
      for (const raceId in newState) {
        newState[raceId].toolProficiencies = JSON.parse(newState[raceId].toolProficiencies);
        newState[raceId].weaponProficiencies = JSON.parse(newState[raceId].weaponProficiencies);
        newState[raceId].armorProficiencies = JSON.parse(newState[raceId].armorProficiencies);
        newState[raceId].languages = JSON.parse(newState[raceId].languages);
      }
      break;
    default:
      break;
  }
  return newState;
};

export default RaceReducer;
