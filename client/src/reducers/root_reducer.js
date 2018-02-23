import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import UsersReducer from './users_reducer';
import CharactersReducer from './characters_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  users: UsersReducer,
  characters: CharactersReducer,
});

export default RootReducer;
