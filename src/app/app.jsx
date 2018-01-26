import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import QuoteForm from './components/quote_form.jsx';
import { Provider } from 'react-redux';

const App = ({store}) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route path='/' component={QuoteForm}/>
      </HashRouter>
    </Provider>
  );
};

export default App;
