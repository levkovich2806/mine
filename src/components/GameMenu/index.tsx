import * as React from 'react';
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

  return (
    <div className={styles.buttons}>
      {LEVEL_NUMBERS.map(level => (
        <div className={styles.button} key={level}>
          <NewGameButton handleClick={() => handleNewLevel(level)}>New {level}</NewGameButton>
        </div>
      ))}
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
