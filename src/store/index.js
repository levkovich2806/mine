import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import wsMiddleware from './wsMiddleware';

const store = createStore(rootReducer, {}, applyMiddleware(wsMiddleware));

export default store;