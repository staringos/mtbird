import React from 'react';
import { Button } from 'antd';
import styles from './style.module.less';
import manifest from './manifest';
import { IComponentDefine, IComponentProps, IComponentInstanceForm, IEvent } from '@mtbird/shared';

const ButtonComponent: IComponentDefine<IComponentInstanceForm> = (props: IComponentProps) => {
  const { children, style, node } = props;

  // if has submit then html type is submit
  const type = node.events?.['click']?.find?.((cur: IEvent) => cur.type === 'submit') ? 'submit' : 'button';

  return (
    <Button {...node.props} htmlType={type} style={style} className={styles.button}>
      {children}
    </Button>
  );
};

ButtonComponent.manifest = manifest;
export default ButtonComponent;
