import { RECEIVE_USER } from '../actions/user_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const UsersReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      break;
    case RECEIVE_CURRENT_USER:
      newState[action.user.id] = action.user;
      break;
    default:
      break;
  }
  return newState;
}

export default UsersReducer;
