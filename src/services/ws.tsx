export default {};
// import store from '../store/index';
//
// import { WS_SERVER } from '../constants';
// import { onConnectSuccess } from '../actions';
// import { parseWsMessage } from '../utils';
//
// let timeout = 250;
// let ws: WebSocket;
// let connectInterval: any;
//
// export const wsConnect = () => {
//   ws = new WebSocket(WS_SERVER);
//
//   // websocket onopen event listener
//   ws.onopen = () => {
//     console.log('connected websocket main component');
//
//     timeout = 250; // reset timer to 250 on open of websocket connection
//     clearTimeout(connectInterval); // clear Interval on on open of websocket connection
//
//     store.dispatch(onConnectSuccess());
//   };
//
//   // websocket onclose event listener
//   ws.onclose = e => {
//     console.log(
//       `Socket is closed. Reconnect will be attempted in ${Math.min(
//         10000 / 1000,
//         (timeout + timeout) / 1000,
//       )} second.`,
//       e.reason,
//     );
//
//     timeout = timeout + timeout; //increment retry interval
//     connectInterval = setTimeout(check, Math.min(10000, timeout)); //call check function after timeout
//   };
//
//   // websocket onerror event listener
//   ws.onerror = (err: any) => {
//     console.error(
//       'Socket encountered error: ',
//       err.message,
//       'Closing socket',
//     );
//
//     ws.close();
//   };
//
//   ws.onmessage = (event: MessageEvent) => {
//     const { data } = event;
//     console.log('Получены данные ' + data);
//     parseWsMessage(data);
//   };
// };
//
// export const wsSendMessage = (message: string) => {
//   ws.send(message);
// };
//
// const check = () => {
//   if (!ws || ws.readyState === WebSocket.CLOSED) wsConnect(); //check if websocket instance is closed, if so call `connect` function.
// };