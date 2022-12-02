import React, { useState } from 'react';
import { IComponentManifest, IComponentInstance, IComponentCommon } from '@mtbird/shared';
import { Collapse } from 'antd';
import ToolBox from '../ToolBox';
import ToolBoxForm from '../ToolBoxForm';
import styles from './style.module.less';
import { Typography } from 'antd';
const { Title } = Typography;

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

const ToolBoxList = ({ category, categoriesGroup }: IProps) => {
  const [activeKey, setActiveKey] = useState<string | string[]>(['common', 'container']);
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
            <Collapse.Panel header={cur.label} key={cur.value}>
              <div className={styles.toolbarList}>
                {cur.list
                  ? cur.list.map((component: IComponentManifest<IComponentInstance>) => {
                      if (category.key === 'form') return <ToolBoxForm key={component.componentName} component={component} />;
                      return <ToolBox key={component.componentName} component={component} />;
                    })
                  : ''}
              </div>
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default ToolBoxList;
