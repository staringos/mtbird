import React, { useContext } from 'react';
import { Dropdown, Menu } from 'antd';
import Model from '../../store/types';
import styles from './style.module.less';

const PageSelect = ({ value }: { value: string }) => {
  const { state } = useContext(Model);

  const handlePageChanged = (page: { key: string }) => {
    state.options?.onPageChange && state.options?.onPageChange(page.key);
  };

  const menu = (
    <Menu
      selectedKeys={[value]}
      onClick={handlePageChanged}
      items={state.pageList.map((cur) => {
        return {
          key: cur.id,
          label: cur.title
        };
      })}
    />
  );

  return (
    <div className={styles.pageSelectContainer}>
      <span className={styles.pageName}>{state.pageConfig.title}</span>
      {(!state.pageList || state.pageList.length === 0) && <span>{state.options.pageConfig.title}</span>}
      {(state.pageList || (state.pageList as any).length) && (
        <Dropdown overlay={menu}>
          <i className="mtbird-icon mtbird-down" />
        </Dropdown>
      )}
    </div>
  );
};

export default PageSelect;
