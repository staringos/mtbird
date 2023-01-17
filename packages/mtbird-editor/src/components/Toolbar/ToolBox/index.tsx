import React, { useContext } from 'react';
import type { IComponent, IComponentInstance } from '@mtbird/shared';
import styles from './style.module.less';
import models from '../../../store/types';

interface IProps {
  component: IComponent<IComponentInstance>;
}

export default ({ component }: IProps) => {
  const { addComponent } = useContext(models).actions;
  const handleClick = () => {
    addComponent(component.instance);
  };

  return (
    <div className={styles.toolbarBoxContainer} onClick={handleClick} id={`${component.componentName}Box`}>
      {component.icon.startsWith('http') ? (
        <img className={styles.toolbarBoxIcon} src={component.icon} />
      ) : (
        <i className={`mtbird-icon ${styles.toolbarBoxIcon} ${component.icon}`} />
      )}
      <h3 className={styles.toolbarBoxTitle}>{component.title}</h3>
    </div>
  );
};
