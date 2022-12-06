import React, { useEffect, useState, useContext } from 'react';
import { Tooltip, Button } from 'antd';
import stylesOut from '../style.module.less';
import styles from './style.module.less';
import Model from 'src/store/types';
import { useInterval } from 'src/utils/hooks';

/**
 * Save page every each 10s
 * @returns
 */
const SaveBtn = () => {
  const { actions, state } = useContext(Model);

  const handleSave = () => {
    actions.onSave && actions.onSave();
  };

  useInterval(handleSave, 10 * 1000);

  const isSaving = state.saveState.state === 'SAVING';

  return (
    <Tooltip
      placement="bottom"
      title={
        isSaving
          ? '保存中...'
          : `已保存 上次保存时间: ${state.saveState.lastSaveTime ? state.saveState.lastSaveTime.toLocaleString().split(' ')[1] : ''}`
      }
    >
      <Button className={stylesOut.headerButton + ' ' + styles.headerButtonSave} type="text" onClick={handleSave} disabled={true}>
        {isSaving ? '保存中...' : '已保存'}
      </Button>
    </Tooltip>
  );
};

export default SaveBtn;
