import * as React from 'react';
// import { wsSendMessage } from '../../services/ws';
import { getNewLevelMessage, getHelpMessage, getMapMessage, getPointClickMessage } from '../../utils';
import { onSendMessage } from '../../actions/websocket';
import { PointClick } from '../../interfaces';
import { connect } from 'react-redux';
import NewGameButton from '../NewGameButton';

import styles from './index.module.css';

interface Props {
  levelIsLoading: boolean,
  onSendMessage: Function
}

const GameMenu: React.FunctionComponent<Props> = ({ levelIsLoading, onSendMessage }) => {
  const handleGetHelp = () => {
    onSendMessage(getHelpMessage());
  };

  const handleNewLevel = (level: number) => {
    onSendMessage(getNewLevelMessage(level));
  };

  const handleGetMap = () => {
    onSendMessage(getMapMessage());
  };

  const handleClick = ({ x, y }: PointClick) => {
    onSendMessage(getPointClickMessage({ x, y }));
  };

  return (
    <div className={styles.buttons}>
      {/*<button onClick={handleGetHelp}>Help</button>*/}
      <div className={styles.button}>
        <NewGameButton handleClick={() => handleNewLevel(1)}>New 1</NewGameButton>
      </div>
      <div className={styles.button}>
        <NewGameButton handleClick={() => handleNewLevel(2)}>New 2</NewGameButton>
      </div>
      <div className={styles.button}>
        <NewGameButton handleClick={() => handleNewLevel(3)}>New 3</NewGameButton>
      </div>
      <div className={styles.button}>
        <NewGameButton handleClick={() => handleNewLevel(4)}>New 4</NewGameButton>
      </div>

      {levelIsLoading && (
        <>
          <button onClick={handleGetMap}>Get Map</button>
          {/*<button onClick={() => handleClick({ x: 2, y: 3 })}>Click 2x3</button>*/}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { main: { levelIsLoading } } = state;

  return {
    levelIsLoading,
  };
};

export default connect(
  mapStateToProps,
  {
    onSendMessage,
  },
)(GameMenu);