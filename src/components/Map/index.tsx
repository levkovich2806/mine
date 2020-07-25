import * as React from 'react';
import { connect } from 'react-redux';
import MapPoint from '../MapPont';
import { onSetFlag, onMapClick } from '../../actions';
import { onSendMessage } from '../../actions/websocket';
import styles from './index.module.css';
import { PointClick } from '../../interfaces';

interface Props {
  map: Array<any>,
  onMapClick: Function,
  onSetFlag: Function,
  mapLoadingState: Boolean,
}

const Map: React.FunctionComponent<Props> = ({ map, onMapClick, onSetFlag, mapLoadingState }) => {

  if (mapLoadingState) {
    return <div>Loading...</div>;
  }

  const handlePointClick = ({ x, y }: PointClick) => {
    onMapClick({ x, y });
  };

  const handleRightClick = ({ x, y }: PointClick) => {
    onSetFlag({
      x,
      y,
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
  const { main: { map, mapLoadingState } } = state;

  return {
    map,
    mapLoadingState,
  };
};

export default connect(
  mapStateToProps,
  {
    onSendMessage,
    onSetFlag,
    onMapClick,
  },
)(Map);