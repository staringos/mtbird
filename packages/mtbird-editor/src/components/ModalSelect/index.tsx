import React, { useContext, useMemo } from 'react';
import Model from '../../store/types';
import { COMPONENT_NAME } from '@mtbird/core';
import { IComponentInstance } from '@mtbird/shared';
import { Select } from 'antd';
import get from 'lodash/get';
import styles from './style.module.less';
import { getCurrentModal } from '../../utils';

const ModalSelect = () => {
  const { state, actions } = useContext(Model);
  const currentModal = getCurrentModal(state.variables);
  const modals = useMemo(() => {
    return state?.pageConfig?.data?.children?.filter((cur: IComponentInstance) => cur?.componentName === COMPONENT_NAME.MODAL) || [];
  }, [state?.pageConfig]);

  const handleSelect = (e: any) => {
    if (!e) return;
    actions.toggleRenderModal(e, true);
  };

  if (currentModal) return <div />;

  return (
    <Select className={styles.modalSelect} value={currentModal} onChange={handleSelect} placeholder="弹窗">
      {modals.map((cur: IComponentInstance) => (
        <Select.Option value={cur.id} key={cur.id}>
          {get(cur, 'data.alias')}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ModalSelect;
