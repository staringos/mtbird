import React, { CSSProperties } from "react";
import { Tabs } from "antd";
import styles from "./style.module.less";

interface IProps {
  activeKey: string;
  onChange: (value: string) => void;
  tabItems: any[];
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
  hideTabContent?: boolean;
  extra?: {
    left?: any;
    right?: any;
  };
}

const TabsComponent = ({
  activeKey,
  onChange,
  tabItems,
  width,
  height,
  style,
  hideTabContent,
  extra,
}: IProps) => {
  return (
    <div
      className={
        styles.tabsContainer + " " + (hideTabContent ? styles.hideContent : "")
      }
      style={{ ...style, width, height: hideTabContent ? 35 : height }}
    >
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        items={tabItems}
        tabBarExtraContent={extra}
      ></Tabs>
    </div>
  );
};

export default TabsComponent;
