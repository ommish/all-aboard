import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store';

const root = document.getElementById('root');
const store = configureStore();
ReactDOM.render(<App store={store}/>, root);
