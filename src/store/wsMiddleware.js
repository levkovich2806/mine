import { BLOCK_OPEN, LOSE_MESSAGE, MAP_START, NEW_LEVEL, WS_SERVER } from '../constants';
import { getMapMessage, parseWsMessage } from '../utils';
import { GAME_OVER, updateMap, getNewLevelSuccess, getMapSuccess } from '../actions';
import {
  onConnectSuccess,
  WS_SEND,
  WS_CONNECT,
  WS_DISCONNECT,
  onSendMessage,
} from '../actions/websocket';

let websocket;

export default (store) => (next) => action => {
  const dispatch = store.dispatch;

  switch (action.type) {

    case WS_CONNECT:
      websocket = new WebSocket(WS_SERVER);

      websocket.onopen = () => dispatch(onConnectSuccess());
      websocket.onclose = (event) => dispatch({ type: 'WEBSOCKET_CLOSE', payload: event });
      websocket.onmessage = (event) => {
        const { type, payload = {} } = parseWsMessage(event.data) || {};

        switch (type) {
          case MAP_START:
            const { map } = payload;
            dispatch(updateMap(map));
            dispatch(getMapSuccess());
            break;
          case NEW_LEVEL:
            dispatch(getNewLevelSuccess());
            break;
          case BLOCK_OPEN:
            if ((payload.answer || '').trim() === LOSE_MESSAGE) {
              alert(LOSE_MESSAGE);
            }
            dispatch(onSendMessage(getMapMessage()));
            break;
          case GAME_OVER:
            dispatch(onSendMessage(getMapMessage()));
            alert('Игра окончена. Вы победили!');
            break;
          default:
            break;
        }
      };

      break;

    case WS_SEND:
      websocket.send(action.payload.message);
      break;

    case WS_DISCONNECT:
      websocket.close();
      break;

    default:
      break;
  }

  return next(action);
};
