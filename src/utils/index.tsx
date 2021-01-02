import { PointClick } from '../interfaces';
import { BLOCK_OPEN, MAP_START, NEW_LEVEL } from '../constants';
import { GAME_OVER } from '../actions';

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
  const [type, answer] = message.split(':');

  if (answer && answer.trim().startsWith('You win')) {
    return {
      type: GAME_OVER,
      payload: {
        answer: answer,
      },
    };
  }

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
