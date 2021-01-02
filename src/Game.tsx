import React, { Component } from 'react';
// import { wsConnect, wsSendMessage } from './services/ws';
import { connect } from 'react-redux';
import GameMenu from './components/GameMenu';
import Map from './components/Map';

import { wsConnect } from './actions/websocket';

import './index.css';
import styles from './index.module.css';

type Props = {
  isConnected: Boolean,
  wsConnect: any
}

class Game extends Component<Props, {}> {

  handleStartGame = () => {
    const { wsConnect } = this.props;

    wsConnect();
    // wsConnect();
  };

  // handleGetHelp = () => {
  //   wsSendMessage(HELP_MESSAGE);
  // };

  render() {
    const { isConnected } = this.props;
    return (
      <>

        {!isConnected ? (
          <div className={styles.start}>
            <button className={styles.startButton} onClick={this.handleStartGame}>Start</button>s
          </div>
        ) : (
          <>
            <div className={styles.menu}>
              <GameMenu/>
            </div>
            <div className={styles.map}>
              <Map/>
            </div>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { main: { isConnected } } = state;

  return {
    isConnected,
  };
};

export default connect(
  mapStateToProps,
  {
    wsConnect,
    // changeModalVisible,
    // changeTrackerFormAction,
    // get_tracker_types,
    // get_markers,
    // clearTrackerForm,
  },
)(Game);
