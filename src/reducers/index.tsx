import { combineReducers } from 'redux';
import main, { IMainState } from './main';

export interface IAppState {
  main: IMainState
}

const reducers = combineReducers({
  main,
});

export default reducers;