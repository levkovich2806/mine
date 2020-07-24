export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const LEVEL_LOADING_SUCCESS = 'LEVEL_LOADING_SUCCESS';
export const UPDATE_MAP = 'UPDATE_MAP';
export const ON_GET_MAP = 'ON_GET_MAP';



export function onLevelIsLoading() {
  return {
    type: LEVEL_LOADING_SUCCESS,
    payload: {
      levelIsLoading: true,
    },
  };
}
