import React, { useState, useContext } from 'react';
import Tabs from '../Tabs';
import { EXTENSION_CONTRIBUTE_TYPE, getModalOptions } from '@mtbird/core';
import Model from '../../store/types';
import { convertExtensionContributeToTab } from '../../utils/tools';
import { IContributeManifest } from '@mtbird/helper-extension';

const BottomBar = () => {
  const store = useContext(Model);
  const { extensionContributes } = store.state;
  const [activeKey, setActiveKey] = useState<string>('');
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
      style={{ borderLeft: '1px solid var(--gray-8)', borderRight: '1px solid var(--gray-8)' }}
    ></Tabs>
  );
};

export default BottomBar;
