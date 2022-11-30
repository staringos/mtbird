import type { IComponentManifest, IComponentInstance } from '@mtbird/shared';
import { generateFormItemSelect } from '../../utils';
import { COMPONENT } from '@mtbird/core';

const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_LAYOUT_FLEX } = COMPONENT;

const manifest: IComponentManifest<IComponentInstance> = {
  type: 'container',
  componentName: 'Container',
  title: '容器',
  icon: 'mtbird-border',
  desc: '',
  category: 'basic',
  subCategory: 'container',
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    generateFormItemSelect('layout', '布局方式', [
      {
        value: 'absolute',
        label: '绝对布局'
      },
      {
        value: 'flex',
        label: '流式布局'
      }
    ]),
    ...SCHEMA_LAYOUT_FLEX
  ],
  instance: {
    type: 'container',
    componentName: 'Container',
    layout: 'absolute',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 100,
        width: 80
      }
    },
    children: []
  }
};

export default manifest;
