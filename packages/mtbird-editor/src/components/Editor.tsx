import React, { useEffect } from 'react';
import type { IOptions } from '@mtbird/shared';
import { Spin } from 'antd';
import Header from './Header';
import Toolbar from './Toolbar';
import Content from './Content';
import styles from './style.module.less';
import Configurator from './Configurator';
import Model from '../store/types';
import throttle from 'lodash/throttle';
import useModels from '../store/useModels';
import useHotKeys from '../store/useHotKeys';
import ModalRender from './ModalRender';
import './global.css';

interface IProps {
  options: IOptions;
}

const Editor = ({ options }: IProps) => {
  const context = useModels(options);
  useHotKeys(context);

  useEffect(
    throttle(() => {
      context.actions.init(context);

      // 离开页面提示
      window.onbeforeunload = function (e) {
        e = e || window.event;
        const msg = '当前内容未保存，确认离开？';
        if (e) {
          // 兼容IE8和Firefox 4之前的版本
          e.returnValue = msg;
        }
        return msg;
      };
    }, 2000),
    []
  );

  return (
    <Model.Provider value={context}>
      {context.state.loading && <Spin spinning={context.state.loading}></Spin>}
      <div className={styles.editorWrapper}>
        <Header />
        <div className={styles.editorContainer}>
          <Toolbar />
          <Content />
          <Configurator />
        </div>
        <ModalRender />
      </div>
    </Model.Provider>
  );
};

export default Editor;
