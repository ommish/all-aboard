import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserHome from './components/user_home';
import Splash from './components/splash';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import CharacterIndex from './components/characters/character_index';
import './App.css';

const App = ({store}) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Switch>
            <ProtectedRoute path='/users/:userId' component={UserHome}/>,
            <AuthRoute path='/' component={Splash}/>
          </Switch>
          <ProtectedRoute exact path='/users/:userId/characters' component={CharacterIndex}/>
        </div>
      </HashRouter>
    </Provider>
  );
};

export default App;
