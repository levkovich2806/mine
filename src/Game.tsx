import React, { Component } from 'react';
// import { wsConnect, wsSendMessage } from './services/ws';
import { connect } from 'react-redux';
import GameMenu from './components/GameMenu';
import Map from './components/Map';

import { wsConnect } from './actions/websocket';

type Props = {
  isConnected: Boolean,
  wsConnect: any
}

class Game extends Component<Props, {}> {

  handleStartGame = () => {
    const { wsConnect } = this.props;
    // console.log('handleStartGame');
    wsConnect();
    // wsConnect();
  };

  // handleGetHelp = () => {
  //   wsSendMessage(HELP_MESSAGE);
  // };

  render() {
    const { isConnected } = this.props;
    return (
      <div>
        <button onClick={this.handleStartGame}>Start</button>
        {isConnected && (
          <>
            <div>
              <GameMenu/>
            </div>
            <div>
              <Map/>
            </div>
          </>
        )}
        {/*<button onClick={this.handleGetHelp}>Help</button>*/}
        {/*<button onClick={() => this.handleNewLevel(1)}>New 1</button>*/}
        {/*<button onClick={() => this.handleNewLevel(2)}>New 2</button>*/}
        {/*<button onClick={() => this.handleNewLevel(3)}>New 3</button>*/}
        {/*<button onClick={() => this.handleNewLevel(4)}>New 4</button>*/}
        {/*<button onClick={this.handleGetMap}>Map</button>*/}
        {/*<button onClick={() => this.handleClick({x: 2, y: 3})}>Click 2x3</button>*/}
      </div>
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