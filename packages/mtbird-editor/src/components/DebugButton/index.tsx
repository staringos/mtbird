import React, { useContext, useMemo, useState } from 'react';
import { Popover, Button, Form, Input, Modal } from 'antd';
import styles from './style.module.less';
import Model from '../../store/types';
import { getParamFromURL, GLOBAL_EXTENSION_KEY, GlobalStorage } from '@mtbird/core';

const DebugPanel = () => {
  const { state } = useContext(Model);
  const [debug, setDebug] = useState(state.options.debug || '');

  const handleStartDebug = () => {
    Modal.confirm({
      title: 'Debug',
      content: '确认开始调试吗？（页面需刷新，请保存修改！）',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        GlobalStorage.debugExtension = debug;
        location.reload();
      }
    });
  };

  const handleStopDebug = () => {
    Modal.confirm({
      title: 'Debug',
      content: '确认停止调试吗？（页面需刷新，请保存修改！）',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        GlobalStorage.debugExtension = null;
        location.reload();
      }
    });
  };

  const handleDebugChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDebug((e.target as any).value);
  };

  return (
    <div className={styles.debugPanel}>
      <Form.Item label="拓展地址" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input value={debug} onChange={handleDebugChange} disabled={state.options.debug} />
      </Form.Item>
      {state.options.debug ? <Button onClick={handleStopDebug}>停止调试</Button> : <Button onClick={handleStartDebug}>开始调试</Button>}
    </div>
  );
};

const DebugButton = () => {
  const { state } = useContext(Model);

  const status = useMemo(() => {
    if (!state.options.debug) return 'error';
    const name = getParamFromURL(state.options.debug, 'name');
    const loaded = window[GLOBAL_EXTENSION_KEY][name];
    return loaded ? 'success' : 'error';
  }, [state.extensionContributes]);

  return (
    <Popover overlayClassName={styles.debugButtonPanel} placement="bottom" title="拓展调试" content={DebugPanel} trigger="click">
      <div className={styles.debugButtonWrapper}>
        <Button className={styles.debugButton} size="small" type="text">
          <i className="mtbird-icon mtbird-bug" />
        </Button>
        {state.options.debug && <i className={styles.debugStatus + ' ' + styles[status]}></i>}
      </div>
    </Popover>
  );
};

export default DebugButton;
