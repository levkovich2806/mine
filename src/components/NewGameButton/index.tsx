import React from 'react';
import styles from './index.module.css';

interface Props {
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void,
  children: any
}

const NewGameButton: React.FunctionComponent<Props> = ({ children, handleClick }) => {
  return (
    <div
      className={styles.newGameButton}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default NewGameButton;
