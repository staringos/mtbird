import React from "react";
import { List } from "antd-mobile";
import { IComponentProps } from "@mtbird/shared/dist/types";

const MobileList = ({ node }: IComponentProps) => {
  return (
    <List header="基础用法">
      <List.Item>1</List.Item>
      <List.Item>2</List.Item>
      <List.Item>3</List.Item>
    </List>
  );
};

export default MobileList;
