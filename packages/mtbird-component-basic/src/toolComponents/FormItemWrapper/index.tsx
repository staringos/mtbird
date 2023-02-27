import React from "react";
import { ISchemaProps } from "../../../types/schema";
import FormItemComponent from "../../components/Form/FormItem";

const FormItemWrapper = (allProps: ISchemaProps) => {
  const { componentOnly } = allProps;
  const { component, ...restProps } = allProps;

  if (componentOnly) return component;

  return (
    <FormItemComponent {...restProps} renderChildrenOnly={true}>
      {component}
    </FormItemComponent>
  );
};

export default FormItemWrapper;
