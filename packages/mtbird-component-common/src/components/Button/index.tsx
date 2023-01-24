import React from 'react';
import styles from './style.module.less';
import manifest from './manifest';
import { IComponentDefine, IComponentProps, IComponentInstanceForm, IEvent } from '@mtbird/shared';
import { AtButton } from 'taro-ui';

const ButtonComponent: IComponentDefine<IComponentInstanceForm> = (props: IComponentProps) => {
  const { children, style, node } = props;

  // if has submit then html type is submit
  // const type = node.events?.['click']?.find?.((cur: IEvent) => cur.type === 'submit') ? 'submit' : 'button';

  return (
    <AtButton {...node.props} style={style} className={styles.button}>
      {children}
    </AtButton>
  );
};

ButtonComponent.manifest = manifest;
export default ButtonComponent;
