import React from "react";
import { SketchPicker } from "react-color";
import { Popover } from "antd";
import { Input } from "antd";
import styles from "./style.module.less";
import manifest from "./manifest";
import { IComponentProps } from "@mtbird/shared";
import values from "lodash/values";
import FormItemWrapper from "src/toolComponents/FormItemWrapper";

const ColorPickerComponent = (allProps: IComponentProps) => {
  const { value, onChangeValue, node } = allProps;
  const { formConfig } = node;
  const handleClickChange = (color: {
    hex: string;
    rgb: Record<string, any>;
  }) => {
    const rgba = values(color.rgb).join(",");
    onChangeValue(`rgba(${rgba})`);
  };

  const component = (
    <div className={styles.colorPickerWrapper}>
      <Popover
        overlayClassName={styles.colorPickerPopover}
        overlayInnerStyle={{ padding: 0 }}
        placement="topLeft"
        content={<SketchPicker color={value} onChange={handleClickChange} />}
        trigger="click"
      >
        <div className={styles.colorFormItem}>
          <div
            className={styles.colorBox}
            style={{ backgroundColor: value }}
          ></div>
          <Input
            style={formConfig?.componentProps.style}
            className={styles.colorTitle}
            value={value}
            disabled
          />
        </div>
      </Popover>
    </div>
  );

  return (
    <FormItemWrapper
      {...allProps}
      renderChildrenOnly={true}
      component={component}
    />
  );
};

ColorPickerComponent.manifest = manifest;

export default ColorPickerComponent;
