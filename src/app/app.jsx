import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPage from './components/main_page';

const App = ({store}) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route path='/' component={MainPage}/>
      </HashRouter>
    </Provider>
  );
};

export default App;
