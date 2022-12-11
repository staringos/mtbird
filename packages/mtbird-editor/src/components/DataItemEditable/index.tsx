import React, { useContext, useEffect, useRef } from 'react';
import styles from './style.module.less';
import Model from '../../store/types';
import RendererWrapper from '../RendererWrapper';
import { COMPONENT_NAME, getNodeFromTreeBranch } from '@mtbird/core';
import { IComponentInstanceCommon } from '@mtbird/shared/dist/types';
import cloneDeep from 'lodash/cloneDeep';

interface IProps {
  moveable: any;
}

const DataItemEditableContainer = () => {
  const { state } = useContext(Model);
  const { currentComponent } = state;
  const node = currentComponent[0];
  const endRef = useRef<any>();

  const dataListComponent = currentComponent
    ? getNodeFromTreeBranch(node, state.componentMap, (node: IComponentInstanceCommon) => node.componentName === COMPONENT_NAME.DATA_LIST)
    : undefined;

  const $dom = document.getElementById(dataListComponent.id || '');

  if (!dataListComponent || dataListComponent === -1 || !$dom) return '';

  const rect = $dom.getBoundingClientRect();
  const child = dataListComponent.children[0];
  const { style } = child.props;

  return (
    <div
      id="dataItemContainer"
      ref={endRef}
      className={styles.dataEditableItem}
      style={{ width: style.width, height: style.height, left: rect.left + rect.width - 50, top: rect.top - (style.height + 50) + 80 }}
    >
      <RendererWrapper pageConfig={{ data: cloneDeep(child), title: '', id: '', headImage: '', type: 'mobile' }} />
    </div>
  );
};

export default DataItemEditableContainer;
