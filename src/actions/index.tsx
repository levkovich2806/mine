import { PointClick } from '../interfaces';

export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const LEVEL_LOADING_SUCCESS = 'LEVEL_LOADING_SUCCESS';
export const UPDATE_MAP = 'UPDATE_MAP';
export const CLEAR_PROGRESS = 'CLEAR_PROGRESS';
export const ON_CHANGE_FLAG_STATE = 'ON_CHANGE_FLAG_STATE';
export const GAME_OVER = 'GAME_OVER';

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

export function onClearProgress() {
  return {
    type: CLEAR_PROGRESS,
  };
}