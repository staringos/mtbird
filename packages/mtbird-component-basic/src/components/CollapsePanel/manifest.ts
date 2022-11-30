import type { IComponentManifest, IComponentInstance } from '@mtbird/shared';
import { COMPONENT, SchemaGenerator } from '@mtbird/core';
const { SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_LAYOUT_FLEX } = COMPONENT;

const manifest: IComponentManifest<IComponentInstance> = {
  type: 'container',
  componentName: 'CollapsePanel',
  title: '折叠面板',
  icon: 'mtbird-insertrowabove',
  desc: '',
  category: 'basic',
  subCategory: 'container',
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    ...SCHEMA_LAYOUT_FLEX,
    SchemaGenerator.collapsePanel('内容', [SchemaGenerator.input('标题', 'data.title')])
  ],
  instance: {
    type: 'container',
    componentName: 'CollapsePanel',
    layout: 'flex',
    data: {
      title: '分组'
    },
    pattern: {
      noWrapper: true
    },
    props: {
      style: {}
    },
    children: []
  }
};

export default manifest;
