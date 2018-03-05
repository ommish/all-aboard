import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserProfile from './components/user_profile';
import Splash from './components/splash';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import CharacterIndex from './components/character_sheet/character_index';
import CharacterSheet from './components/character_sheet/character_sheet_container';
import CharacterBuilder from './components/character_builder/character_builder_container';
import './App.css';

const App = ({store}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Switch>
            <ProtectedRoute path='/users/:userId' component={UserProfile}/>
            <ProtectedRoute path='/characters/:characterId' component={CharacterSheet}/>
            <AuthRoute exact path='/' component={Splash}/>
          </Switch>
          <ProtectedRoute exact path='/users/:userId/characters' component={CharacterIndex}/>
          <ProtectedRoute exact path='/users/:userId/new-character' component={CharacterBuilder}/>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
