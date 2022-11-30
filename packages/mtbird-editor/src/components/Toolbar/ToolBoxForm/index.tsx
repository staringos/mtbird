import React, { useContext } from 'react';
import type { IComponent } from '@mtbird/shared';
import styles from './style.module.less';
import models from '../../../store/types';

export default ({ component }: IComponent) => {
  const { addComponent } = useContext(models).actions;
  const handleClick = () => {
    addComponent(component.instance);
  };

  return (
    <div className={styles.toolbarBoxContainer} onClick={handleClick}>
      <h3 className={styles.toolbarBoxTitle}>{component.title}</h3>
    </div>
  );
};
