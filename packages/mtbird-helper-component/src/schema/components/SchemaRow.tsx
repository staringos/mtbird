import React from 'react';
import styles from './schemaRow.module.less';

interface IProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

export default ({ title, children }: IProps) => {
  return (
    <div className={styles.schemaRowContainer}>
      <div className={styles.schemaRowTitle}>{title}</div>
      <div className={styles.schemaRowContent}>{children}</div>
    </div>
  );
};
