export const LOAD_ACCOUNTS = 'LOAD_ACCOUNTS';
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
    return web3.eth.getAccounts()
      .then(addresses => {
        const promises = addresses.map(address => {
          return web3.eth.getBalance(address)
            .then((balance) => {
              return {
                address: address,
                balance: balance
              }
            });
        });
        return Promise.all(promises);
      })
      .then(accounts => {
        dispatch(loadAccounts(false));
        dispatch(fetchAccountsSuccess(accounts));
        return accounts;
      })
      .catch(() => dispatch(fetchAccountsError(true)));
  }
};
