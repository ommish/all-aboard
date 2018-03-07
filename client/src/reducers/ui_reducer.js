import { TOGGLE_CHARACTER_SHEET_SECTION } from '../actions/ui_actions';
import { merge } from 'lodash';

const initialState = {
  characterSheet: {
    physical: true,
    bonuses: true,
    proficiencies: true,
  }
}

const UIReducer = (state = initialState, action) => {
  const newState = merge({}, state);
  switch (action.type) {
    case TOGGLE_CHARACTER_SHEET_SECTION:
      newState.characterSheet[action.section] = !newState.characterSheet[action.section];
      break;
    default:
    return state;
  }
  return newState;
}

export default UIReducer;
