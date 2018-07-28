import { combineReducers } from 'redux';
import { accounts, fetchAccountsError, loadAccounts } from './accountReducer';

export default combineReducers({
  fetchAccountsError,
  loadAccounts,
  accounts
});
