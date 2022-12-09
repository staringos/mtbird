import { IComponentInstanceCommon } from '@mtbird/shared/src/types/Component';
import React, { ReactNode } from 'react';
import styles from './style.module.less';
import get from 'lodash/get';

interface IProps {
  renderChildren: ReactNode;
  node: IComponentInstanceCommon;
}

const DataEditableItem = ({ renderChildren, node }: IProps) => {
  const { style } = get(node, 'children[0].props');
  const parentStyle = get(node, 'props.style');

  return (
    <div
      className={styles.dataEditableItem}
      style={{ width: style.width, height: style.height, left: parentStyle.width - 50, top: style.height + 50 }}
    >
      {renderChildren}
    </div>
  );
};

export default DataEditableItem;
