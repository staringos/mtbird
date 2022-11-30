import React from 'react';
import { Radio } from 'antd';
import { IComponentProps } from '@mtbird/shared';
import manifest from './manifest';
import FormItemWrapper from 'src/toolComponents/FormItemWrapper';
import styles from './style.module.less';

const RadioComponent = (allProps: IComponentProps) => {
  const { node, onChangeValue, value } = allProps;
  const { data, props } = node;

  const component = (
    <Radio.Group className={styles.radioGroup} onChange={(e) => onChangeValue(e.target.value)} value={value}>
      {data?.options.map((cur: any) => (
        <Radio value={cur.value} key={cur.value} style={{ color: props?.style?.color }}>
          {cur.label}
        </Radio>
      ))}
    </Radio.Group>
  );

  return <FormItemWrapper {...allProps} renderChildrenOnly={true} component={component}></FormItemWrapper>;
};

RadioComponent.manifest = manifest;

export default RadioComponent;
