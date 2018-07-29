import { combineReducers } from 'redux';
import { accounts, fetchAccountsError, loadAccounts } from './accountReducer';
import { sendFailure, sendingToken, lastTransactionHash } from './sendTokenReducer';

export default combineReducers({
  fetchAccountsError,
  loadAccounts,
  accounts,
  sendingToken,
  sendFailure,
  lastTransactionHash
});
