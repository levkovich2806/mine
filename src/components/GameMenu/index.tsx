import * as React from 'react';
import { getNewLevelMessage, getMapMessage } from '../../utils';
import { onSendMessage } from '../../actions/websocket';
import { onGetNewLevel } from '../../actions';
import { connect } from 'react-redux';
import NewGameButton from '../NewGameButton';

import styles from './index.module.css';

const LEVEL_NUMBERS = [1, 2, 3, 4];

interface Props {
  levelIsLoading: boolean,
  onGetNewLevel: Function
}

const GameMenu: React.FunctionComponent<Props> = ({ levelIsLoading, onGetNewLevel }) => {
  const handleNewLevel = (level: number) => {

    onGetNewLevel(level);
  };

  // const handleGetMap = () => {
  //   onSendMessage(getMapMessage());
  // };

  return (
    <div className={styles.buttons}>
      {LEVEL_NUMBERS.map(level => (
        <div className={styles.button} key={level}>
          <NewGameButton handleClick={() => handleNewLevel(level)}>New {level}</NewGameButton>
        </div>
      ))}

      {/*<div className={styles.button}>*/}
      {/*  <NewGameButton handleClick={() => handleNewLevel(2)}>New 2</NewGameButton>*/}
      {/*</div>*/}
      {/*<div className={styles.button}>*/}
      {/*  <NewGameButton handleClick={() => handleNewLevel(3)}>New 3</NewGameButton>*/}
      {/*</div>*/}
      {/*<div className={styles.button}>*/}
      {/*  <NewGameButton handleClick={() => handleNewLevel(4)}>New 4</NewGameButton>*/}
      {/*</div>*/}

      {/*{levelIsLoading && (*/}
      {/*  <button onClick={handleGetMap}>Get Map</button>*/}
      {/*)}*/}
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
    onGetNewLevel,
  },
)(GameMenu);