import React, { useContext } from 'react';
import styles from './style.module.less';
import Model from '../../store/types';
import RendererWrapper from '../RendererWrapper';
import { COMPONENT_NAME, getNodeFromTreeBranch } from '@mtbird/core';
import { IComponentInstanceCommon } from '@mtbird/shared/dist/types';

interface IProps {
  moveable: any;
}

const DataItemEditableContainer = () => {
  const { state } = useContext(Model);
  const { currentComponent } = state;
  const node = currentComponent[0];

  if (currentComponent.length > 1) return '';

  const dataListComponent = getNodeFromTreeBranch(
    node,
    state.componentMap,
    (node: IComponentInstanceCommon) => node.componentName === COMPONENT_NAME.DATA_LIST
  );

  if (dataListComponent === -1) return '';

  const $dom = document.getElementById(dataListComponent.id || '');

  if (!$dom) return '';

  const rect = $dom.getBoundingClientRect();
  const child = dataListComponent.children[0];
  const { offsetTop, offsetLeft } = $dom;
  const { style } = child.props;

  return (
    <div
      className={styles.dataEditableItem}
      style={{ width: style.width, height: style.height, left: offsetLeft + rect.width - 50, top: offsetTop - (style.height + 50) }}
    >
      <RendererWrapper pageConfig={{ data: child, title: '', id: '', headImage: '', type: 'mobile' }} />
    </div>
  );
};

export default DataItemEditableContainer;
