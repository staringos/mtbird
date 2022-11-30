import React from 'react';
import styles from './style.module.less';
import manifest from './manifest';
import { IComponentProps } from '@mtbird/shared/src/types/Component';

const ContainerRoot = ({ children, node, className, style }: IComponentProps) => {
  return (
    <div {...node.props} style={style} className={styles.containerRoot + ' ' + className}>
      {children}
    </div>
  );
};

ContainerRoot.manifest = manifest;

export default ContainerRoot;
