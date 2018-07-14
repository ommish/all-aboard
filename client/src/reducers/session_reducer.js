import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const SessionReducer = (state = { currentUser: null }, action) => {
	const newState = merge({}, state);
	switch (action.type) {
		case RECEIVE_CURRENT_USER:
			if (action.user) {
				newState.currentUser = action.user;
			}
			break;
		default:
			break;
	}
	return newState;
};

export default SessionReducer;
