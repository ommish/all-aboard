import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import { unregister } from './registerServiceWorker';
import { fetchCurrentUser } from './actions/session_actions';

const root = document.getElementById('root');
const store = configureStore();
ReactDOM.render(<App store={store}/>, root);
