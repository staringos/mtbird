import React, { useRef, useState } from 'react';
import { Input, InputNumber } from 'antd';
import manifest from './manifest';
import { IComponentProps } from '@mtbird/shared';

import styles from './style.module.less';
import FormItemWrapper from 'src/toolComponents/FormItemWrapper';

const InputComponent = (allProps: IComponentProps) => {
  const { onChangeValue, node, value } = allProps;
  const { formConfig } = node;
  const inputRef = useRef<HTMLDivElement>();

  const handleChange = (e: any) => {
    let value = e?.target ? e?.target.value || '' : e;
    onChangeValue(value);
  };

  const { type, ...restComponentProps } = formConfig?.componentProps || {};

  const component = (
    <div className={styles.inputWrapper}>
      {type === 'number' ? (
        <InputNumber
          className={styles.inputComponent + ' ' + styles[`${restComponentProps.style.color}Color`]}
          ref={inputRef}
          size="small"
          {...restComponentProps}
          value={value}
          onChange={handleChange}
          controls={false}
        />
      ) : (
        <Input className={styles.inputComponent} ref={inputRef} size="small" {...formConfig?.componentProps} value={value} onChange={handleChange} />
      )}
    </div>
  );

  return <FormItemWrapper {...allProps} renderChildrenOnly={true} component={component} />;
};

InputComponent.manifest = manifest;

export default InputComponent;
