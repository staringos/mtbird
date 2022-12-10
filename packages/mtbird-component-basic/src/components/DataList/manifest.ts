import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT, SchemaGenerator } from '@mtbird/core';
const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_DATA_BASIC, SCHEMA_GRID_LAYOUT } = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'component',
  componentName: 'DataList',
  title: '数据列表',
  icon: 'mtbird-metroselect_m_back',
  desc: '',
  category: 'basic',
  subCategory: 'data',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_GRID_LAYOUT, ...SCHEMA_DATA_BASIC],
  instance: {
    type: 'component',
    componentName: 'DataList',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 200,
        width: 260,
        display: 'flex',
        flexFlow: 'wrap',
        overflowY: 'auto'
      }
    },
    formConfig: {
      label: '列表',
      keyPath: 'data.options'
    },
    data: {
      type: 'model'
    },
    layout: 'grid',
    children: [
      SchemaGenerator.container(
        [],
        { width: 200, height: 200 },
        {
          background: 'var(--gray-3)'
        }
      )
    ]
  }
};

export default manifest;
