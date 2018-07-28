import React from 'react';
import './index.css';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import * as redux from 'react-redux';
import AccountBalanceBoard from './components/AccountBalanceBoard';

const store = configureStore();

render(
  <redux.Provider store={store}>
    <AccountBalanceBoard />
  </redux.Provider>,
  document.getElementById('root')
);
