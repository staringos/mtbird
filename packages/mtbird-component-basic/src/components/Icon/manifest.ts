import type { IComponentManifest, IComponentInstance } from '@mtbird/shared';
import { COMPONENT } from '@mtbird/core';

const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE } = COMPONENT;

const manifest: IComponentManifest<IComponentInstance> = {
  type: 'component',
  componentName: 'Icon',
  category: 'basic',
  title: 'Icon',
  icon: 'mtbird-check-circle',
  desc: '',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE],
  instance: {
    type: 'component',
    componentName: 'Icon',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        fontSize: 30,
        width: 30,
        height: 30
      },
      className: 'mtbird-icon mtbird-close'
    },
    children: []
  }
};

export default manifest;
