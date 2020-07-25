import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import styles from './index.module.css';
import { BOMB_BLOCK, COLORS, UNDEFINED_BLOCK } from '../../constants';
import { IAppState } from '../../reducers';
import { PointClick } from '../../interfaces';


interface Props {
  pointData: PointClick,
  handleClick: Function,
  handleRightClick: Function,
}

const MapPoint: React.FunctionComponent<Props> = ({ pointData, handleClick, handleRightClick }) => {
  const withColor = (point: string) => <span style={{ color: `${COLORS[Number(point)]}` }}>{point}</span>;

  const bombImage = <img src={'/bomb.png'} alt={'Bomb'}/>;

  const contextMenuHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    handleRightClick(pointData);
  };

  const undefinedBlock = (pointData: PointClick) => {
    return (
      <span
        className={styles.undefinedPoint}
        onClick={() => handleClick(pointData)}
        onContextMenu={contextMenuHandler}
      />
    );
  };

  const flags = useSelector((state: IAppState) => state.main.flags);
  const map = useSelector((state: IAppState) => state.main.map);

  const { x, y } = pointData || {};

  if (flags[`${x}.${y}`]) {
    return (
      <span
        className={styles.point}
        onContextMenu={contextMenuHandler}
      >
        <img src={'/flag.png'} alt={'Flag'}/>
      </span>
    );
  }

  const point = map[y][x];

  return (
    <div
      className={styles.point}
    >
      {
        (point === UNDEFINED_BLOCK) ?
          undefinedBlock(pointData) :
          (point === BOMB_BLOCK ?
              bombImage :
              withColor(point)
          )
      }
    </div>
  );
};

export default memo(MapPoint);