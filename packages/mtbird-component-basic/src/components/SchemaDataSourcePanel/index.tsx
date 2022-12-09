import React, { useState } from 'react';
import { Button } from 'antd';
import { SchemaSelect, List } from '@mtbird/ui';
import { IComponentProps, IModelField } from '@mtbird/shared';
import get from 'lodash/get';
import styles from './style.module.less';
import manifest from './manifest';

const SEARCH_COLUMNS = [
  {
    label: '字段',
    value: 'keyPath'
  },
  {
    label: '运算符',
    value: 'operator'
  },
  {
    label: '值',
    value: 'value'
  }
];

const SchemaDataSourcePanel = ({ dataSource, node, variables }: IComponentProps) => {
  const target = dataSource?.getValue('0');
  const dataModelId = get(target, 'data.targetId');

  if (!dataModelId) return '';

  const searchs = get(target, 'data.features.search'); //get(node, 'data.features.search');
  const dataModel = variables['$modelsOptions'].find((cur: any) => cur.id === dataModelId);

  if (!dataModel) return '';

  const [sort, setSort] = useState<string[]>([]);
  const fieldOption = dataModel.DataModelField.map((field: IModelField) => ({ value: field.id, label: field.displayName }));

  const handleSortChange = (values: string[]) => {
    setSort(values);
  };

  return (
    <div className={styles.dataSourceWrapper}>
      <div className={styles.dataSourceHeader}>
        <title>搜索项</title>
        <Button type="link" size="small">
          增加
        </Button>
      </div>
      <List data={searchs} columns={SEARCH_COLUMNS} />
      {/* <Form.Item label="排序">
        <SchemaSelect options={fieldOption} value={sort} onChange={handleSortChange} multiple />
      </Form.Item> */}
    </div>
  );
};

SchemaDataSourcePanel.manifest = manifest;

export default SchemaDataSourcePanel;
