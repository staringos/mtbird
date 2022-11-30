import React, { useEffect } from 'react';
import { Switch, Form, InputNumber } from 'antd';
import { IAnimate } from '@mtbird/shared';
import styles from './style.module.less';

interface IProps {
  onChange: (type: string, value: any) => void;
  value: IAnimate;
}

const AttributeForm = ({ onChange, value }: IProps) => {
  return (
    <Form size="small" labelCol={{ span: 8 }}>
      <Form.Item label={<label className={styles.label}>循环</label>}>
        <Switch checked={value.infinite} onChange={(e: boolean) => onChange('pattern.animate.infinite', e)} />
      </Form.Item>
      <Form.Item label={<label className={styles.label}>延迟时间</label>}>
        <InputNumber
          className={styles.input}
          value={value.delay}
          size="small"
          precision={0}
          max={99}
          min={0}
          controls={false}
          onChange={(e: number) => onChange('pattern.animate.delay', e)}
        />{' '}
        <span className={styles.label}>s</span>
      </Form.Item>
      <Form.Item label={<label className={styles.label}>持续时间</label>}>
        <InputNumber
          className={styles.input}
          value={value.duration}
          size="small"
          precision={0}
          max={99}
          min={0}
          controls={false}
          onChange={(e: number) => onChange('pattern.animate.duration', e)}
        />{' '}
        <span className={styles.label}>s</span>
      </Form.Item>
    </Form>
  );
};

export default AttributeForm;
