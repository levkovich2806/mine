import * as React from 'react';
import { connect } from 'react-redux';
import MapPoint from '../MapPont';
import { onSetFlag, onMapClick } from '../../actions';
import { onSendMessage } from '../../actions/websocket';
import styles from './index.module.css';
import { getPointRound } from '../../utils';

interface Props {
  map: Array<any>,
  flags: any,
  mapLoadingState: Boolean,
  onMapClick: Function,
  onSetFlag: Function
}

const Map: React.FunctionComponent<Props> = ({ map, mapLoadingState, flags, onMapClick, onSetFlag }) => {
  if (mapLoadingState) {
    return <div>Loading...</div>;
  }

  const onQuickOpen = ({ x, y }: { x: number, y: number }) => {
    getPointRound(map, x, y);
  };

  return (
    <div>
      {(map || []).map((line, indexRow) => {
        return (
          <div key={indexRow} className={styles.line}>
            {line.map((point: string, indexColumn: number) => {
              const x = indexColumn;
              const y = indexRow;

              return (
                <MapPoint
                  key={indexColumn}
                  isFlag={flags[`${x}.${y}`]}
                  point={point}
                  x={x}
                  y={y}
                  onMapClick={onMapClick}
                  onSetFlag={onSetFlag}
                  onQuickOpen={onQuickOpen}
                />
              );
            })}
          </div>);
      })}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { main: { map, mapLoadingState, flags } } = state;

  return {
    flags,
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
