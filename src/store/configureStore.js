import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = initialState => {
  return createStore(
    // NOTE rootReducerはcombineReducersが提供してくれる
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
};

export default configureStore;
