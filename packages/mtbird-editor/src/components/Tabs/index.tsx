import React, { CSSProperties } from 'react';
import { Tabs } from 'antd';
import styles from './style.module.less';

interface IProps {
  activeKey: string;
  onChange: (value: string) => void;
  tabItems: any[];
  width?: number | string;
  height?: number | string;
  style: CSSProperties;
}

const TabsComponent = ({ activeKey, onChange, tabItems, width, height, style }: IProps) => {
  return (
    <div className={styles.tabsContainer} style={{ ...style, width, height }}>
      <Tabs activeKey={activeKey} onChange={onChange} items={tabItems}></Tabs>
    </div>
  );
};

export default TabsComponent;
