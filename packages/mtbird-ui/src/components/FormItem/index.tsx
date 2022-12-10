import React, { ReactNode } from 'react';
import { Form } from 'antd';
import styles from './style.module.less';

interface IProps {
  children: ReactNode;
  isRequired?: boolean;
  labelWidth?: number;
  label: string;
  suffix?: string;
}

const FormItemComponent = ({ children, isRequired, labelWidth, label, suffix }: IProps) => {
  return (
    <Form.Item
      className={styles.formItem}
      colon={false}
      label={
        <label className={styles.label} style={{ width: labelWidth || 80 }}>
          {label || ' '}
        </label>
      }
      required={isRequired}
    >
      <div className={styles.formItemContent}>
        {children}
        {suffix && <span className={styles.label}>&nbsp;&nbsp;{suffix}</span>}
      </div>
    </Form.Item>
  );
};

export default FormItemComponent;
