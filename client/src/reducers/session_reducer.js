import { RECEIVE_CURRENT_USER, LOGOUT } from '../actions/session_actions';

const SessionReducer = (state = { currentUser: null }, action) => {
	switch (action.type) {
		case RECEIVE_CURRENT_USER:
			return { currentUser: action.user };
		case LOGOUT:
			return { currentUser: null };
		default:
			return state;
	}
};

export default SessionReducer;
