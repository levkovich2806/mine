// export const WS_CONNECTING = "WS_CONNECTING";
// export const WS_CONNECTED = "WS_CONNECTED";

// export const WS_DISCONNECTED = "WS_DISCONNECTED";

// export const wsConnecting = host => ({ type: WS_CONNECTING, host });
// export const wsConnected = host => ({ type: WS_CONNECTED, host });
// export const wsDisconnect = host => ({ type: WS_DISCONNECT, host });
// export const wsDisconnected = host => ({ type: WS_DISCONNECTED, host });

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
  // console.log(message);
  return {
    type: WS_SEND,
    payload: {
      message,
    },
  };
}