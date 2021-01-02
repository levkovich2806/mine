import React, { memo, useCallback } from 'react';
import classnames from 'classnames'
import styles from './index.module.css';
import { BOMB_BLOCK, MOUSE_MIDDLE_BTN, UNDEFINED_BLOCK } from '../../constants';
import { PointClick } from '../../interfaces';

function isEqual(prev: any, next: any) {
  const { point, isFlag } = prev;
  const { point: nextPoint, isFlag: nextIsFlag } = next;

  return point === nextPoint && isFlag === nextIsFlag;
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


  const bombImage = <img src={'/bomb.png'} alt={'Bomb'}/>;

  const contextMenuHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleRightClick({ x, y });
  };

  const handlePointClick = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    onMapClick({ x, y });
  }, []);

  const handleRightClick = useCallback(({ x, y }: PointClick) => {
    onSetFlag({
      x,
      y,
    });
  }, []);

  const handleWheelClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();

    //Mouse middle
    if (e.button === MOUSE_MIDDLE_BTN) {
      console.log('MIDDLE');
    }
  };

  const withColor = (point: string) => (
    <div
      onMouseDown={handleWheelClick}
      className={classnames(styles.point_resolve, styles[`point_resolve_${point}`])}
    >
      {parseInt(point) > 0 ? point : ''}
    </div>
  );

  if (isFlag) {
    return (
      <div
        className={styles.point}
        onContextMenu={contextMenuHandler}
      >
        <img src={'/flag.png'} alt={'Flag'}/>
      </div>
    );
  }

  return (
    <div
      className={styles.point}
    >
      {
        (point === UNDEFINED_BLOCK) ?
          (<div
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

export default memo(MapPoint, isEqual);
