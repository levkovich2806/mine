// import store from '../store/index';
import { PointClick } from '../interfaces';
import { BLOCK_OPEN, MAP_START, NEW_LEVEL } from '../constants';
import { GAME_OVER } from '../actions';
// import { onConnectSuccess, onLevelIsLoading, updateMap } from '../actions';

export const getNewLevelMessage = (level: number) => {
  return `new ${level}`;
};

export const getHelpMessage = () => {
  return `help`;
};

export const getMapMessage = () => {
  return `map`;
};

export const getPointClickMessage = ({ x, y }: PointClick) => {
  return `open ${x} ${y}`;
};

export const parseWsMessage = (message: string) => {
  console.log({ message });
  const [type, answer] = message.split(':');

  // console.log({
  //   type,
  //   answer,
  // });

  switch (type) {
    case MAP_START:
      return {
        type: MAP_START,
        payload: {
          map: getMap(answer),
        },
      };
    case NEW_LEVEL:
      return {
        type: NEW_LEVEL,
        payload: {
          answer,
        },
      };
    case BLOCK_OPEN:
      return {
        type: BLOCK_OPEN,
        payload: {
          answer,
        },
      };
    default:
      break;
  }

  // if (answer && answer.startsWith('You win')) {
  //   return {
  //     type: GAME_OVER,
  //     payload: {
  //       answer: answer,
  //     },
  //   };
  // }

  // if (message.startsWith(MAP_START)) {
  //
  //
  //   if (params[1]) {
  //     const map = getMap(params[1]);
  //     // store.dispatch(updateMap(map));
  //     return {
  //       type: MAP_START,
  //       payload: {
  //         map,
  //       },
  //     };
  //   }
  // } else if (message.startsWith(NEW_LEVEL)) {
  //   console.log('new level answer', message);
  //   return {
  //     type: NEW_LEVEL,
  //   };
  //   // store.dispatch(onLevelIsLoading());
  // } else if (message.startsWith(BLOCK_OPEN)) {
  //   console.log('block open answer', message);
  //   return {
  //     type: BLOCK_OPEN,
  //   };
  // }

  // return null;
};

export const getMap = (data: string | undefined = '') => {
  const lines = data.split('\n');
  const result: Array<any> = [];

  (lines || []).forEach(line => {
    if (line.length > 0) {
      result.push(line.split(''));
    }
  });

  return result;
};