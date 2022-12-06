import React, { useContext, useState } from 'react';
import { Button, Tooltip } from 'antd';
import styles from './style.module.less';
import Model from 'src/store/types';
import PageSelect from '../PageSelect';
import DebugButton from '../DebugButton';
import HeaderBars from './HeaderBars';
import PlatformSelect from '../PlatformSelect';
import UserList from '../UserList';
import ShareDropdown from '../ShareDropdown';
import SaveBtn from './SaveBtn';

export default () => {
  const { actions, state } = useContext(Model);
  const [publishing, setPublishing] = useState(false);

  // const handleSave = () => {
  //   actions.onSave && actions.onSave(state.pageConfig.data);
  // };

  const handleBack = () => {
    state.options.onBack ? state.options.onBack() : history.back();
  };

  const handlePreview = () => {
    state.options?.onPreview && state.options?.onPreview(state.pageConfig.data);
  };

  const handlePublish = async () => {
    setPublishing(true);
    await actions.publishPage();
    setPublishing(false);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <Tooltip placement="right" title="返回">
          <Button type="link" onClick={handleBack} className={styles.headerBackButton}>
            <i className="mtbird-icon mtbird-left"></i>
          </Button>
        </Tooltip>
        <div className={styles.splitLine} />
        <Tooltip placement="bottom" title={`${state.tabsState['toolTabs'] ? '隐藏' : '显示'}组件面板`}>
          <Button
            className={styles.headerButton}
            style={{ textAlign: 'center', padding: 0 }}
            type="text"
            onClick={() => actions.toggleTab('toolTabs')}
          >
            <i
              className="mtbird-icon mtbird-border-right"
              style={{ fontSize: '18px', margin: 0, color: state.tabsState['toolTabs'] ? 'var(--mtbird-primary-5)' : 'white' }}
            />
          </Button>
        </Tooltip>
        <div className={styles.splitLine} />
        <HeaderBars />
      </div>
      <div className={styles.headerCenter}>
        <a>APP</a> / <PageSelect value={state.pageConfig.id} />
      </div>
      <div className={styles.headerRight}>
        <UserList />
        <div className={styles.splitLine} />
        <PlatformSelect />
        <div className={styles.splitLine} />
        <DebugButton />
        <div className={styles.splitLine} />
        <Tooltip placement="bottom" title="上一步 (ctrl + z | cmd + z)">
          <Button className={styles.headerButton} type="text" onClick={() => actions.prevStep()}>
            <i className="mtbird-icon mtbird-arrowleft" />
          </Button>
        </Tooltip>
        <Tooltip placement="bottom" title="下一步 (ctrl + shift + z | cmd + shift + z)">
          <Button className={styles.headerButton} type="text" onClick={() => actions.nextStep()}>
            <i className="mtbird-icon mtbird-arrowright" />
          </Button>
        </Tooltip>
        <div className={styles.splitLine} />
        <SaveBtn />
        {/* <Tooltip placement="bottom" title="保存">
          <Button className={styles.headerButton} type="text" onClick={handleSave} disabled={true}>
            已保存
          </Button>
        </Tooltip> */}
        <Button className={styles.headerButton} type="text" onClick={handlePreview}>
          <i className="mtbird-icon mtbird-tablet" />
          预览
        </Button>
        <Button className={styles.headerButton} type="text" onClick={handlePublish} loading={publishing} disabled={publishing}>
          <i className="mtbird-icon mtbird-up-square" />
          发布
        </Button>
        <ShareDropdown page={state.pageConfig}>
          <Button className={styles.headerButton} type="text">
            <i className="mtbird-icon mtbird-share" />
            分享
          </Button>
        </ShareDropdown>
        <div className={styles.splitLine} />
        <Tooltip placement="bottom" title={`${state.tabsState['schemaTabs'] ? '隐藏' : '显示'}样式面板`}>
          <Button className={styles.headerButton} style={{ color: 'white' }} type="text" onClick={() => actions.toggleTab('schemaTabs')}>
            <i className="mtbird-icon mtbird-control" style={{ color: state.tabsState['schemaTabs'] ? 'var(--mtbird-primary-5)' : 'white' }} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
