import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import UserHome from './components/user_home';
import Splash from './components/splash';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import './App.css';

const App = ({store}) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <ProtectedRoute exact path='/home' component={UserHome}/>,
          <AuthRoute path='/' component={Splash}/>
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default App;
