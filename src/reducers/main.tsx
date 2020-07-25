import { CLEAR_PROGRESS, CONNECT_SUCCESS, LEVEL_LOADING_SUCCESS, ON_CHANGE_FLAG_STATE, UPDATE_MAP } from '../actions';
import { FlagMap } from '../interfaces';

export interface IMainState {
  map: Array<any>;
  isConnected: boolean;
  levelIsLoading: boolean;
  flags: FlagMap;
}

const initialState: IMainState = {
  isConnected: false,
  levelIsLoading: false,
  map: [],
  flags: {},
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

  if (action.type === ON_CHANGE_FLAG_STATE) {
    const { flags } = state;
    const { x, y } = action.payload;
    const key = `${x}.${y}`;

    return {
      ...state,
      ...{
        flags: {
          ...flags,
          [key]: !(flags as FlagMap)[key],
        },
      },
    };
  }

  if (action.type === CLEAR_PROGRESS) {
    return { ...state, ...{ flags: {} } };
  }

  return state;
}

export default rootReducer;
