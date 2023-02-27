import React from "react";
import { Switch } from "antd";
import { IComponentProps } from "@mtbird/shared";
import manifest from "./manifest";
import FormItemWrapper from "src/toolComponents/FormItemWrapper";
import styles from "./style.module.less";

const SwitchComponent = (allProps: IComponentProps) => {
  const { onChangeValue, value } = allProps;
  const component = (
    <Switch
      size="small"
      className={styles.radioGroup}
      onChange={(e) => onChangeValue(e)}
      checked={value}
    />
  );

  return (
    <FormItemWrapper
      {...allProps}
      renderChildrenOnly={true}
      component={component}
    ></FormItemWrapper>
  );
};

SwitchComponent.manifest = manifest;

export default SwitchComponent;
