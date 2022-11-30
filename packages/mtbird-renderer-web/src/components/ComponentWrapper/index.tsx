import React from 'react';
import type { IComponent } from '@mtbird/shared';
import styles from './style.module.less';

interface IProps {
  children: React.ReactNode;
  component: IComponent;
}

const convertPosition = (component: IComponent) => {
  return { ...component.style };
};

export default ({ children, component }: IProps) => {
  return (
    <div className={styles.componentWrapper} style={convertPosition(component)}>
      {children}
    </div>
  );
};
