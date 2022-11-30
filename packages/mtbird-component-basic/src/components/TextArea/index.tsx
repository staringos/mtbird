import React from 'react';
import { Input } from 'antd';
import manifest from './manifest';
import { IComponentProps } from '@mtbird/shared';
import { generateFunction } from '@mtbird/core';
import FormItemComponent from '../Form/FormItem';
import styles from './style.module.less';

const TextAreaComponent = (allProps: IComponentProps) => {
  const { onChangeValue, node, value, componentOnly } = allProps;
  const { formConfig } = node;

  const handleChange = (e: any) => {
    let newValue = e?.target?.value || e;
    if (formConfig.valueFormatter) {
      newValue = generateFunction(formConfig.valueFormatter)(newValue, value);
    }
    onChangeValue(newValue);
  };

  const component = (
    <Input.TextArea {...formConfig?.componentProps} className={styles.textAreaComponent} value={value} onChange={handleChange}></Input.TextArea>
  );

  if (componentOnly) return component;

  return (
    <FormItemComponent {...allProps} renderChildrenOnly={true}>
      {component}
    </FormItemComponent>
  );
};

TextAreaComponent.manifest = manifest;

export default TextAreaComponent;
