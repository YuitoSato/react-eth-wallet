export const SENDING_TOKEN = 'SENDING_TOKEN';
export const SEND_SUCCESS = 'SEND_SUCCESS';
export const SEND_FAILURE = 'SEND_FAILURE';

export const sendingToken = sending => ({
  type: SENDING_TOKEN,
  isSending: sending
});

export const sendSuccess = transactionHash => ({
  type: SEND_SUCCESS,
  transactionHash: transactionHash
});

export const sendFailure = hasError => ({
  type: SEND_FAILURE,
  hasError: hasError
});

export const sendToken = (web3, to, from, amount, password) => {
  console.log(web3, to, from, amount, password);
  return (dispatch) => {
    dispatch(sendingToken(true));

    const transaction = {
      from: from,
      to: to,
      value: amount
    };
    return web3.eth.personal.sendTransaction(transaction, password)
      .then(transactionHash => {
        dispatch(sendingToken(false));
        dispatch(sendSuccess(transactionHash));
        return transactionHash;
      }).catch(() => dispatch(sendFailure(true)));
  }
};
