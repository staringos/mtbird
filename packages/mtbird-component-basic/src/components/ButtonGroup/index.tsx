import { IComponentProps } from '@mtbird/shared';
import React from 'react';
import { Button } from 'antd';
import { pureStyle } from '@mtbird/core';
import manifest from './manifest';
import styles from './style.module.less';

const ButtonGroup = ({ node, dataSource, onChangeValue }: IComponentProps) => {
  const { formConfig, data } = node;
  const { options } = data;
  const handleClick = (keyPath: string, value: string) => {
    onChangeValue(value, keyPath);
  };

  return (
    <div className={styles.buttonGroup}>
      {options?.map?.((cur: { keyPath: string; icon: string; label: string; value: string }) => {
        const actualValue = dataSource?.getValue('0.' + cur.keyPath);
        const isActive = actualValue === cur.value;
        const type = isActive ? 'primary' : 'default';

        return (
          <Button
            key={cur.keyPath + cur.value}
            className={styles.buttonGroupButton}
            style={pureStyle(formConfig?.componentProps?.style)}
            size="small"
            type={type}
            onClick={() => handleClick(cur.keyPath, isActive ? cur.defaultValue : cur.value)}
          >
            {cur.icon && <i className={`mtbird-icon ${cur.icon}`}></i>}
            {cur.label}
          </Button>
        );
      })}
    </div>
  );
};

ButtonGroup.manifest = manifest;

export default ButtonGroup;
