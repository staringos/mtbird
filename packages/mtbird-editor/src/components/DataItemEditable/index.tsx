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
  const { currentDataContainer } = state;
  const endRef = useRef<any>();

  const $dom = document.getElementById(currentDataContainer?.id || '');
  let display = 'block';

  if (!currentDataContainer || !$dom) display = 'none';

  // const rect = $dom ? $dom.getBoundingClientRect() : ({} as Record<string, number>);
  const child = currentDataContainer?.children?.[0];
  const { style } = child?.props || { style: {} };
  // const { offsetLeft, offsetTop } = $dom || { offsetLeft: 0, offsetTop: 0 };

  // const $toolbarDom = document.getElementById('toolbarContent')?.getBoundingClientRect() || { width: 0 };
  return (
    <div
      id="dataItemContainer"
      ref={endRef}
      className={styles.dataEditableItem}
      style={{
        width: style.width,
        height: style.height,
        right: -style.width - 20,
        display
      }}
    >
      {display === 'block' && <RendererWrapper pageConfig={{ data: cloneDeep(child), title: '', id: '', headImage: '', type: 'mobile' }} />}
    </div>
  );
};

export default DataItemEditableContainer;
