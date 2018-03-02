import { RECEIVE_COMPENDIUM } from '../actions/compendium_actions';
import { merge } from 'lodash';

const ClassReducer = (state, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_COMPENDIUM:
      newState = merge({}, action.charClasses);
      for (const charClassId in newState) {
        newState[charClassId].savingThrows = JSON.parse(newState[charClassId].savingThrows);
        newState[charClassId].toolProficiencies = JSON.parse(newState[charClassId].toolProficiencies);
        newState[charClassId].weaponProficiencies = JSON.parse(newState[charClassId].weaponProficiencies);
        newState[charClassId].armorProficiencies = JSON.parse(newState[charClassId].armorProficiencies);
        newState[charClassId].languages = JSON.parse(newState[charClassId].languages);
        newState[charClassId].equipment = JSON.parse(newState[charClassId].equipment);
      }
      break;
    default:
      break;
  }
  return newState;
};

export default ClassReducer;
