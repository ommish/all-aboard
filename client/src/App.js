import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserProfile from './components/user_profile';
import Splash from './components/splash';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import CharacterIndex from './components/characters/character_index';
import CharacterSheet from './components/characters/character_sheet_container';
import './App.css';

const App = ({store}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <ProtectedRoute path='/users/:userId' component={UserProfile}/>
            <ProtectedRoute path='/characters/:characterId' component={CharacterSheet}/>
            <AuthRoute path='/' component={Splash}/>
          </Switch>
          <ProtectedRoute exact path='/users/:userId/characters' component={CharacterIndex}/>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
