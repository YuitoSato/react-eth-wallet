export const LOAD_ACCOUNTS= 'LOAD_ACCOUNTS';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_ERROR = 'FETCH_ACCOUNTS_ERROR';

export const loadAccounts = status => ({
  type: LOAD_ACCOUNTS,
  isLoading: status
});

export const fetchAccountsSuccess = accounts => ({
  type: FETCH_ACCOUNTS_SUCCESS,
  accounts: accounts
});

export const fetchAccountsError = status => ({
  type: FETCH_ACCOUNTS_ERROR,
  hasError: status
});

export const fetchAccounts = web3 => {
  return (dispatch) => {
    dispatch(loadAccounts(true));
    web3.eth.getAccounts()
      .then((accounts) => {
        dispatch(loadAccounts(false));
        dispatch(fetchAccountsSuccess(accounts));
        return accounts;
      })
      .catch(() => dispatch(fetchAccountsError(true)));
  }
};
