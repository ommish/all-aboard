import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import UsersReducer from './users_reducer';
import CharactersReducer from './characters_reducer';
import RaceReducer from './race_reducer';
import ClassReducer from './class_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  users: UsersReducer,
  characters: CharactersReducer,
  races: RaceReducer,
  charClasses: ClassReducer,
});

export default RootReducer;
