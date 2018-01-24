import ReactDOM from 'react';
import React from 'react';
import { App } from './app';
import configureStore from './store';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();
  ReactDOM.render('root', <App store={store}/>);
});
