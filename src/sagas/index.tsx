import { takeLatest, call, put } from '@redux-saga/core/effects';
import {
  ON_GET_MAP_SUCCESS,
  ON_GET_NEW_LEVEL,
  ON_GET_NEW_LEVEL_SUCCESS,
  onClearProgress, setMapLoadingState,
} from '../actions';
import { onSendMessage } from '../actions/websocket';
import { getMapMessage, getNewLevelMessage } from '../utils';

export default function* watcherSaga() {
  yield takeLatest(ON_GET_NEW_LEVEL, saga_on_get_new_level);
  yield takeLatest(ON_GET_NEW_LEVEL_SUCCESS, saga_on_get_new_level_success);
  yield takeLatest(ON_GET_MAP_SUCCESS, saga_on_get_map_success);
}

function* saga_on_get_new_level({ payload: { level = 1 } = {} }: any) {
  yield put(setMapLoadingState(true));
  yield put(onClearProgress());
  yield put(onSendMessage(getNewLevelMessage(level)));
}

function* saga_on_get_new_level_success() {
  yield put(onSendMessage(getMapMessage()));
}

function* saga_on_get_map_success() {
  yield put(setMapLoadingState(false));
}