import { BLOCK_OPEN, LOSE_MESSAGE, MAP_START, NEW_LEVEL, OK_MESSAGE, WS_SERVER } from '../constants';
import { getMapMessage, parseWsMessage } from '../utils';
import { onLevelIsLoading } from '../actions';
import { onConnectSuccess, updateMap, WS_SEND, WS_CONNECT, WS_DISCONNECT, onSendMessage } from '../actions/websocket';

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

        // console.log({ type, payload });

        switch (type) {
          case MAP_START:
            const { map } = payload;
            dispatch(updateMap(map));
            break;
          case NEW_LEVEL:
            dispatch(onLevelIsLoading());
            dispatch(onSendMessage(getMapMessage()));
            break;
          case BLOCK_OPEN:
            if ((payload.answer || '').trim() === OK_MESSAGE) {
              dispatch(onSendMessage(getMapMessage()));
            } else if ((payload.answer || '').trim() === LOSE_MESSAGE) {
              dispatch(onSendMessage(getMapMessage()));
            }
            break;
          default:
            break;
        }
        // dispatch({ type: 'WEBSOCKET_MESSAGE', payload: event });
      };

      break;

    // User request to send a message
    case WS_SEND:
      websocket.send(action.payload.message);
      break;

    // User request to disconnect
    case WS_DISCONNECT:
      websocket.close();
      break;

    default: // We don't really need the default but ...
      break;
  }

  return next(action);
};