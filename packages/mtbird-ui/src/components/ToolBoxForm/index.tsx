import React, { useContext } from 'react';
import styles from './style.module.less';
import models from '../../../../mtbird-editor/src/store/types';

export default ({ component }: any) => {
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
