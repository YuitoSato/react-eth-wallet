import React from 'react';
import './index.css';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import * as redux from 'react-redux';
import App from './App';

const store = configureStore();

render(
  <redux.Provider store={store}>
    <App />
  </redux.Provider>,
  document.getElementById('root')
);
