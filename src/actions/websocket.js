import { CONNECT_SUCCESS } from './index';

export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_CONNECT = 'WS_CONNECT';
export const WS_SEND = 'WS_SEND';


export const wsConnect = () => {
  return {
    type: WS_CONNECT,
  };
};

export function onConnectSuccess() {
  return {
    type: CONNECT_SUCCESS,
    payload: {
      isConnected: true,
    },
  };
}

export function onSendMessage(message) {
  return {
    type: WS_SEND,
    payload: {
      message,
    },
  };
}