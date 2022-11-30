import React from 'react';
import Canvas from '../Canvas';
import ModalSelect from '../ModalSelect';
import ModalStatusBar from '../ModalStatusBar';
import PanelRender from '../PanelRender';

import styles from './style.module.less';

export default () => {
  return (
    <div className={styles.content}>
      <Canvas />
      <ModalSelect />
      <PanelRender />
      <ModalStatusBar />
    </div>
  );
};
