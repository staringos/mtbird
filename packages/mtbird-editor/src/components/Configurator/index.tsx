import React, { useMemo, useState } from 'react';
import { Tabs } from 'antd';
import set from 'lodash/set';
import styles from './style.module.less';
import Model from '../../store/types';
import { IModel } from '@mtbird/shared';
import { ExtensionRender } from '@mtbird/helper-extension';

import { SchemaEditorRender } from '@mtbird/helper-component';
import { useContext } from 'react';
import { generateSchemaForm } from '../../utils';
import { EXTENSION_CONTRIBUTE_TYPE, getModalOptions } from '@mtbird/core';

export default () => {
  const store = useContext(Model);
  const { state, actions } = store;
  const { currentComponent, schemaDataSource, extensionComponents, pageConfig, extensionContributes, options } = state;
  const schemaTabs = extensionContributes.get(EXTENSION_CONTRIBUTE_TYPE.SCHEMA.TABS);
  const [data, setData] = useState({});
  const [tabActiveKey, setTabActiveKey] = useState('1');
  const handleTabChange = (key: string) => {
    setTabActiveKey(key);
  };

  const onChange = (keyPath: string, value: any) => {
    setData(set(data, keyPath, value));
  };

  const firstCurrentComponent = currentComponent?.[0];
  const schemaConfig = generateSchemaForm(extensionComponents as any, firstCurrentComponent?.componentName);
  const variables = useMemo(
    () => ({
      $modalsList: getModalOptions(pageConfig.data),
      $models: options.models,
      $modelsOptions: options.models?.map((cur: IModel) => ({ ...cur, label: cur.name, value: cur.id })) || []
    }),
    [pageConfig.data]
  );

  const styleTab = {
    label: '样式',
    key: '1',
    children: (
      <SchemaEditorRender
        schemaConfig={schemaConfig}
        value={data}
        onChange={onChange}
        dataSource={schemaDataSource}
        onUpload={actions.onUpload}
        variables={variables}
      />
    )
  };

  const tabItems = [
    styleTab,
    ...(schemaTabs || []).map((cur) => ({
      label: cur.params.name,
      key: cur.params.name + cur.feature,
      children: cur.link === 'feature' ? <ExtensionRender store={store} featureKey={cur.feature} /> : ''
    }))
  ];

  return (
    <div className={styles.configuratorContainer}>
      <Tabs activeKey={tabActiveKey} onChange={handleTabChange} items={tabItems}></Tabs>
    </div>
  );
};
