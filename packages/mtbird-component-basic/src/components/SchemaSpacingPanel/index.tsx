import { IComponentProps } from '@mtbird/shared';
import React, { ChangeEvent } from 'react';
import styles from './style.module.less';
import { Input } from 'antd';

interface IInputProps {
  pos: 'Left' | 'Right' | 'Top' | 'Bottom';
  type: 'margin' | 'padding';
}

const SchemaSpacingPanel = ({ onChangeValue, value, style }: IComponentProps) => {
  const handleInput = (key: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      console.log('key: ', key, e.target.value);
      onChangeValue(parseFloat(e.target.value), `props.style.${key}`);
    };
  };

  const InputComponent = ({ pos, type }: IInputProps) => {
    const key = type + pos;
    return (
      <Input
        type="number"
        className={styles.inputCommon + ' ' + styles[`input${pos}`]}
        defaultValue={value[key]}
        placeholder="0"
        onBlur={handleInput(key)}
        size="small"
      />
    );
  };

  return (
    <div className={styles.marginContainer} style={style}>
      <div className={styles.paddingContainer}>
        <div className={styles.box}>
          <span>内容</span>
        </div>
        <span className={styles.title}>内边距</span>
        <InputComponent pos="Top" type="padding" />
        <InputComponent pos="Right" type="padding" />
        <InputComponent pos="Bottom" type="padding" />
        <InputComponent pos="Left" type="padding" />
      </div>
      <span className={styles.title}>外边距</span>
      <InputComponent pos="Top" type="margin" />
      <InputComponent pos="Right" type="margin" />
      <InputComponent pos="Bottom" type="margin" />
      <InputComponent pos="Left" type="margin" />
    </div>
  );
};

export default SchemaSpacingPanel;
