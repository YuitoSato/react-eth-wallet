import { FETCH_ACCOUNTS_ERROR, FETCH_ACCOUNTS_SUCCESS, LOAD_ACCOUNTS } from '../actions/accountAction';

export const loadAccounts = (state = false, action) => {
  switch (action.type) {
    case LOAD_ACCOUNTS:
      return action.isLoading;
    default:
      return state;
  }
};

export const fetchAccountsError = (state = false, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_ERROR:
      return action.hasError;
    default:
      return state;
  }
};

export const accounts = (state = [], action) => {
  switch (action.type) {
    case FETCH_ACCOUNTS_SUCCESS:
      return action.accounts;
    default:
      return state;
  }
};
