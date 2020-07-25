import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import wsMiddleware from './wsMiddleware';
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(wsMiddleware, sagaMiddleware),
);
sagaMiddleware.run(saga);

export default store;