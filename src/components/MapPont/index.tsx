import React, { MouseEventHandler, memo } from 'react';
import classNames from 'classnames';
import styles from './index.module.css';
import { BOMB_BLOCK, COLORS, UNDEFINED_BLOCK } from '../../constants';


interface Props {
  point: string,
  onClick: MouseEventHandler,
}

const withColor = (point: string) => <span style={{ color: `${COLORS[Number(point)]}` }}>{point}</span>;

const MapPoint: React.FunctionComponent<Props> = ({ point, onClick }) => {
  return (
    <div
      className={classNames(styles.point, point === UNDEFINED_BLOCK && styles.undefinedPoint)}
      onClick={onClick}
    >
      {point === UNDEFINED_BLOCK ?
        '' :
        (point === BOMB_BLOCK ?
            <img src={'/bomb.png'} alt={'Bomb'}/> :
            withColor(point)
        )
      }
    </div>
  );
};

export default memo(MapPoint);