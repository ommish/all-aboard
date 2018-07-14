import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import UserReducer from './user_reducer';
import CharacterReducer from './character_reducer';
import RaceReducer from './race_reducer';
import ClassReducer from './class_reducer';
import BackgroundReducer from './background_reducer';
import ArmorReducer from './armor_reducer';
import UIReducer from './ui_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  users: UserReducer,
  characters: CharacterReducer,
  races: RaceReducer,
  charClasses: ClassReducer,
  backgrounds: BackgroundReducer,
  armors: ArmorReducer,
  ui: UIReducer,
});

export default RootReducer;
