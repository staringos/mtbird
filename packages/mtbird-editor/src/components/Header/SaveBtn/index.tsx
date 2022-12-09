import React, { useState, useContext } from 'react';
import { Tooltip, Button, message } from 'antd';
import styles from './style.module.less';
import Model from '../../../store/types';
import { useInterval } from 'src/utils/hooks';

/**
 * Save page every each 10s
 * @returns
 */
const SaveBtn = () => {
  const { actions, state } = useContext(Model);
  const [netError, setNetError] = useState(false);

  const handleSave = async () => {
    try {
      actions.onSave && (await actions.onSave());
      if (netError) setNetError(false);
    } catch (e) {
      // when network error, report only once
      if (!netError) {
        setNetError(true);
        message.error('网络异常，未自动保存，请点击保存按钮重试!');
      }
    }
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
      <Button className={styles.headerButtonSave} type="text" onClick={handleSave}>
        {isSaving ? '保存中...' : '已保存'}
      </Button>
    </Tooltip>
  );
};

export default SaveBtn;
