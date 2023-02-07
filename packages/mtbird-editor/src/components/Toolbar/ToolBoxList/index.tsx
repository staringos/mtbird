import React, { useContext, useState } from 'react';
import { IComponentCommon, IComponentInstance } from '@mtbird/shared';
import { Collapse } from 'antd';
import { ToolBoxList } from '@mtbird/ui';
import styles from './style.module.less';
import Model from '../../../store/types';

interface IProps {
  category: any;
  categoriesGroup: any;
}

const subCategoryGroup = [
  {
    label: '通用',
    value: 'common',
    list: []
  },
  {
    label: '容器',
    value: 'container',
    list: []
  },
  {
    label: '移动端',
    value: 'mobile',
    list: []
  },
  {
    label: '数据',
    value: 'data',
    list: []
  }
];

const ToolBoxListComponent = ({ category, categoriesGroup }: IProps) => {
  const [activeKey, setActiveKey] = useState<string | string[]>(['common', 'container']);
  const { actions } = useContext(Model);
  const list = categoriesGroup[category.key];

  if (!list) return <div />;

  const subs = subCategoryGroup.map((cur, i: number) => {
    cur.list = list.filter((cmpt: IComponentCommon) => cmpt.subCategory === cur.value || (!cmpt.subCategory && i === 0));
    return cur;
  });

  const handleChange = (e: string | string[]) => {
    setActiveKey(e);
  };

  return (
    <div className={styles.toolbarListWrapper}>
      <Collapse activeKey={activeKey} onChange={handleChange}>
        {subs.map((cur) => {
          if (!cur.list || cur.list.length === 0) return;

          return (
            <Collapse.Panel header={cur.label} key={cur.value} id={`${cur.value}ToolBar`}>
              <ToolBoxList
                list={cur.list}
                isForm={category.key === 'form'}
                onItemClick={(instance: IComponentInstance) => actions.addComponent(instance)}
              />
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default ToolBoxListComponent;
