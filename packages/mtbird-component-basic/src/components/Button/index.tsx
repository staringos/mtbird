import React from 'react';
import { Button } from 'antd';
import styles from './style.module.less';
import manifest from './manifest';
import { IComponentDefine, IComponentProps, IComponentInstanceForm } from '@mtbird/shared';

const ButtonComponent: IComponentDefine<IComponentInstanceForm> = (props: IComponentProps) => {
  const { children, style, node } = props;
  const type = node.events?.click?.type;

  return (
    <Button {...node.props} htmlType={type} style={style} className={styles.button}>
      {children}
    </Button>
  );
};

ButtonComponent.manifest = manifest;
export default ButtonComponent;
