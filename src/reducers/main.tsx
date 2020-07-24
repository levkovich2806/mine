import { CONNECT_SUCCESS, LEVEL_LOADING_SUCCESS, UPDATE_MAP } from '../actions';

const initialState = {
  isConnected: false,
  levelIsLoading: false,
  map: [],
  bombsFound: {},
};

function rootReducer(state = initialState, action: any) {
  if (action.type === CONNECT_SUCCESS) {
    return { ...state, ...{ isConnected: action.payload.isConnected } };
  }

  if (action.type === LEVEL_LOADING_SUCCESS) {
    return { ...state, ...{ levelIsLoading: action.payload.levelIsLoading } };
  }

  if (action.type === UPDATE_MAP) {
    return { ...state, ...{ map: action.payload.map } };
  }

  return state;
}

export default rootReducer;
