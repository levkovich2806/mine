import * as React from 'react';
import { connect } from 'react-redux';
import MapPoint from '../MapPont';
import { onSendMessage } from '../../actions/websocket';
import styles from './index.module.css';
import { getPointClickMessage } from '../../utils';
import { PointClick } from '../../interfaces';

interface Props {
  map: Array<any>,
  onSendMessage: Function
}

const Map: React.FunctionComponent<Props> = ({ map, onSendMessage }) => {

  const handlePointClick = ({ x, y }: PointClick) => {
    onSendMessage(getPointClickMessage({ x, y }));
  };

  console.log('Map render');

  return (
    <div>
      {(map || []).map((line, indexRow) => {
        return (
          <div key={indexRow} className={styles.line}>
            {line.map((point: string, indexColumn: number) => {
              return (
                <MapPoint
                  key={indexColumn}
                  point={point}
                  onClick={() => handlePointClick({ x: indexColumn, y: indexRow })}
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
  },
)(Map);