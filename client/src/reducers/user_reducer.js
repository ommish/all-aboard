import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const UserReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_USER:
      newState[action.user._id] = action.user;
      break;
    case RECEIVE_CURRENT_USER:
      if (action.user) {
        newState[action.user._id] = action.user;
      }
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}

export default UserReducer;
