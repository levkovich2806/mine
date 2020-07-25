import { PointClick } from '../interfaces';

export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const LEVEL_LOADING_SUCCESS = 'LEVEL_LOADING_SUCCESS';
export const CLEAR_PROGRESS = 'CLEAR_PROGRESS';
export const ON_CHANGE_FLAG_STATE = 'ON_CHANGE_FLAG_STATE';
export const ON_MAP_CLICK = 'ON_MAP_CLICK';
export const GAME_OVER = 'GAME_OVER';
export const ON_GET_NEW_LEVEL = 'ON_GET_NEW_LEVEL';
export const MAP_LOADING_STATE = 'MAP_LOADING_STATE';
export const ON_GET_NEW_LEVEL_SUCCESS = 'ON_GET_NEW_LEVEL_SUCCESS';
export const ON_GET_MAP_SUCCESS = 'ON_GET_MAP_SUCCESS';
export const UPDATE_MAP = 'UPDATE_MAP';

export function onLevelIsLoading() {
  return {
    type: LEVEL_LOADING_SUCCESS,
    payload: {
      levelIsLoading: true,
    },
  };
}

export function onSetFlag({ x, y }: PointClick) {
  return {
    type: ON_CHANGE_FLAG_STATE,
    payload: {
      x,
      y,
    },
  };
}

export function onMapClick({ x, y }: PointClick) {
  return {
    type: ON_MAP_CLICK,
    payload: {
      x,
      y,
    },
  };
}

export function onClearProgress() {
  return {
    type: CLEAR_PROGRESS,
  };
}

export function onGetNewLevel(level: number) {
  return {
    type: ON_GET_NEW_LEVEL,
    payload: {
      level,
    },
  };
}


export function updateMap(map: Array<string>) {
  return {
    type: UPDATE_MAP,
    payload: {
      map,
    },
  };
}

export function getNewLevelSuccess() {
  return {
    type: ON_GET_NEW_LEVEL_SUCCESS,
  };
}

export function getMapSuccess() {
  return {
    type: ON_GET_MAP_SUCCESS,
  };
}

export function setMapLoadingState(state: Boolean) {
  return {
    type: MAP_LOADING_STATE,
    payload: {
      state,
    },
  }
}