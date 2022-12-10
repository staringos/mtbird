import React from 'react';
import { pureStyle } from '@mtbird/core';
import { ISchemaProps } from '../../../types/schema';
import styles from './style.module.less';
import manifest from './manifest';
import FormItemWrapper from 'src/toolComponents/FormItemWrapper';

const SelectComponent = (allProps: ISchemaProps) => {
  const { value, node, onChangeValue, style } = allProps;
  const { formConfig, data } = node as any;
  const { options } = data;
  const restStyle = { ...pureStyle(style), ...formConfig?.componentProps?.style };

  const component = (
    <select
      value={value}
      style={{ color: !value ? '#d9d9d9' : '#000', ...restStyle }}
      className={styles.selectComponent}
      onChange={(e: any) => onChangeValue(e.target.value)}
    >
      <option selected={value === undefined} value={undefined} disabled>
        {formConfig?.placeholder ? formConfig.placeholder : '-- 请选择 --'}
      </option>
      {options &&
        options.map &&
        options.map((cur: { value: string; label: string }) => {
          return (
            <option value={cur.value} key={cur.value}>
              {cur.label}
            </option>
          );
        })}
    </select>
  );

  return <FormItemWrapper {...allProps} renderChildrenOnly={true} component={component}></FormItemWrapper>;
};

SelectComponent.manifest = manifest;

export default SelectComponent;
