import { TOGGLE_CHARACTER_SHEET_SECTION, ADD_NOTIFICATION } from '../actions/ui_actions';
import { merge } from 'lodash';

const initialState = {
  characterSheet: {
    appearance: true,
    bonuses: true,
    proficiencies: true,
    equipment: true,
  },
  notification: {
    type: null,
    message: null,
    title: null,
    code: null,
  }
}

const UIReducer = (state = initialState, action) => {
  const newState = merge({}, state);
  switch (action.type) {
    case TOGGLE_CHARACTER_SHEET_SECTION:
      newState.characterSheet[action.section] = !newState.characterSheet[action.section];
      break;
    case ADD_NOTIFICATION:
      newState.notification = action.notification;
      break;
    default:
    return state;
  }
  return newState;
}

export default UIReducer;
