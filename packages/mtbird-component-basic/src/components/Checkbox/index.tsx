import React from "react";
import { Checkbox } from "antd";
import manifest from "./manifest";

import FormItemComponent from "../Form/FormItem";
import { IComponentProps } from "@mtbird/shared/src/types/Component";

const CheckboxComponent = (allProps: IComponentProps) => {
  const { node, style, onChangeValue, value } = allProps;
  const { data, props } = node;

  return (
    <FormItemComponent {...allProps} renderChildrenOnly={true}>
      <Checkbox.Group
        {...props}
        value={value}
        options={data?.options}
        style={style}
        onChange={(e: any) => {
          onChangeValue(e);
        }}
      />
    </FormItemComponent>
  );
};

CheckboxComponent.manifest = manifest;

export default CheckboxComponent;
