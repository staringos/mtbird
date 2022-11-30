import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT } from '@mtbird/core';
const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE } = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'component',
  componentName: 'SplitLine',
  title: '分割线',
  icon: 'mtbird-line',
  desc: '',
  category: 'basic',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE],
  instance: {
    type: 'component',
    componentName: 'SplitLine',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 1,
        backgroundColor: 'var(--gray-8)',
        width: 200
      }
    },
    children: []
  }
};

export default manifest;
