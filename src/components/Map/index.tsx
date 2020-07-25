import * as React from 'react';
import { connect } from 'react-redux';
import MapPoint from '../MapPont';
import { onSetFlag } from '../../actions';
import { onSendMessage } from '../../actions/websocket';
import styles from './index.module.css';
import { getPointClickMessage } from '../../utils';
import { PointClick } from '../../interfaces';

interface Props {
  map: Array<any>,
  onSendMessage: Function,
  onSetFlag: Function
}

const Map: React.FunctionComponent<Props> = ({ map, onSendMessage, onSetFlag }) => {

  const handlePointClick = ({ x, y }: PointClick) => {
    onSendMessage(getPointClickMessage({ x, y }));
  };

  const handleRightClick = ({ x, y }: PointClick) => {
    console.log('handleRightClick');
    // console.log(event);
    // event.preventDefault();
    onSetFlag({
      x, y,
    });
  };

  return (
    <div>
      {(map || []).map((line, indexRow) => {
        return (
          <div key={indexRow} className={styles.line}>
            {line.map((point: string, indexColumn: number) => {
              const pointData = { x: indexColumn, y: indexRow };

              return (
                <MapPoint
                  key={indexColumn}
                  pointData={pointData}
                  handleClick={handlePointClick}
                  handleRightClick={handleRightClick}
                />
              );
            })}
          </div>);
      })}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { main: { map } } = state;

  return {
    map,
  };
};

export default connect(
  mapStateToProps,
  {
    onSendMessage,
    onSetFlag,
  },
)(Map);