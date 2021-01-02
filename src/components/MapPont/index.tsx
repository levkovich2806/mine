import React, { memo, useCallback } from 'react';
import styles from './index.module.css';
import { BOMB_BLOCK, COLORS, UNDEFINED_BLOCK } from '../../constants';
import { PointClick } from '../../interfaces';

function test(prev: any, next: any) {
  const { point } = prev;
  const { point: nextPoint } = next;

  return point === nextPoint;
}

interface Props {
  x: number,
  y: number,
  onMapClick: Function,
  onSetFlag: Function,
  isFlag: boolean
  point: string
}

const MapPoint: React.FunctionComponent<Props> = ({ x, y, onMapClick, onSetFlag, isFlag, point }) => {
  const withColor = (point: string) => <span style={{ color: `${COLORS[Number(point)]}` }}>{point}</span>;

  const bombImage = <img src={'/bomb.png'} alt={'Bomb'}/>;

  const contextMenuHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    handleRightClick({ x, y });
  };

  const handlePointClick = useCallback(() => {
    onMapClick({ x, y });
  }, []);

  const handleRightClick = useCallback(({ x, y }: PointClick) => {
    onSetFlag({
      x,
      y,
    });
  }, []);

  if (isFlag) {
    return (
      <span
        className={styles.point}
        onContextMenu={contextMenuHandler}
      >
        <img src={'/flag.png'} alt={'Flag'}/>
      </span>
    );
  }


  return (
    <div
      className={styles.point}
    >
      {
        (point === UNDEFINED_BLOCK) ?
          (<span
            className={styles.undefinedPoint}
            onClick={handlePointClick}
            onContextMenu={contextMenuHandler}
          />) :
          (point === BOMB_BLOCK ?
              bombImage :
              withColor(point)
          )
      }
    </div>
  );
};

export default memo(MapPoint, test);
