import type { IComponentManifest, IComponentInstance } from '@mtbird/shared';
import { SchemaGenerator, COMPONENT } from '@mtbird/core';
const { SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_LAYOUT_FLEX } = COMPONENT;

const manifest: IComponentManifest<IComponentInstance> = {
  type: 'form',
  componentName: 'Collapse',
  title: '折叠面板',
  icon: 'mtbird-unorderedlist',
  desc: '',
  category: 'basic',
  subCategory: 'container',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_LAYOUT_FLEX],
  instance: {
    type: 'container',
    componentName: 'Collapse',
    layout: 'flex',
    props: {
      style: {}
    },
    children: [
      SchemaGenerator.collapsePanel('菜单1', [SchemaGenerator.title('菜单内容', {})], true, { color: '#333' }),
      SchemaGenerator.collapsePanel('菜单1', [], true, {}),
      SchemaGenerator.collapsePanel('菜单1', [], true, {})
    ]
  }
};

export default manifest;
