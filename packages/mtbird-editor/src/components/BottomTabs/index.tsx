import React, { useState, useContext } from 'react';
import { Button } from 'antd';
import Tabs from '../Tabs';
import { EXTENSION_CONTRIBUTE_TYPE, getModalOptions } from '@mtbird/core';
import Model from '../../store/types';
import { convertExtensionContributeToTab } from '../../utils/tools';
import { IContributeManifest } from '@mtbird/helper-extension';
import styles from './style.module.less';

const BottomBar = () => {
  const store = useContext(Model);
  const { actions, state } = store;
  const { extensionContributes, tabsState } = state;
  const [activeKey, setActiveKey] = useState<string>('页面结构mtbird-extension-enterprise.enterprise.struct-tree.feature');
  const schemaTabs = extensionContributes.get(EXTENSION_CONTRIBUTE_TYPE.BOTTOM.TABS);

  const onChange = (value: string) => {
    setActiveKey(value);
  };

  const tabItems = convertExtensionContributeToTab(schemaTabs as IContributeManifest, store);

  return (
    <Tabs
      activeKey={activeKey}
      tabItems={tabItems}
      onChange={onChange}
      width="unset"
      height={260}
      hideTabContent={!tabsState['bottomTabs']}
      extra={{
        right: (
          <Button type="text" onClick={() => actions.toggleTab('bottomTabs')} className={styles.toggleBottomTabButton}>
            {tabsState['bottomTabs'] ? <i className="mtbird-icon mtbird-down" /> : <i className="mtbird-icon mtbird-up" />}
          </Button>
        )
      }}
    ></Tabs>
  );
};

export default BottomBar;
