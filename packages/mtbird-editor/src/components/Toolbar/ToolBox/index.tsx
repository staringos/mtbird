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
      {component.icon.startsWith('http') ? (
        <img className={styles.toolbarBoxIcon} src={component.icon} />
      ) : (
        <i className={`mtbird-icon ${styles.toolbarBoxIcon} ${component.icon}`} />
      )}
      <h3 className={styles.toolbarBoxTitle}>{component.title}</h3>
    </div>
  );
};
