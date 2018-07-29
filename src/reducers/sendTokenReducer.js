import { SEND_FAILURE, SEND_SUCCESS, SENDING_TOKEN } from '../actions/sendTokenAction';

export const sendingToken = (state = false, action) => {
  switch (action.type) {
    case SENDING_TOKEN:
      return action.isSending;
    default:
      return state;
  }
};

export const sendFailure = (state = false, action) => {
  switch (action.type) {
    case SEND_FAILURE:
      return action.hasError;
    default:
      return state;
  }
};

export const lastTransactionHash = (state = '', action) => {
  switch (action.type) {
    case SEND_SUCCESS:
      return action.transactionHash;
    default:
      return state;
  }
};
