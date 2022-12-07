import type { IComponentManifest, IComponentInstance } from '@mtbird/shared';
import { COMPONENT, SchemaGenerator } from '@mtbird/core';
const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_FORM_CONFIG } = COMPONENT;

const manifest: IComponentManifest<IComponentInstance> = {
  type: 'component',
  componentName: 'SchemaAlignPanel',
  title: '对其面板',
  icon: 'mtbird-metroselect_m_back',
  desc: '',
  category: 'form',
  hideInToolbar: true,
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_FORM_CONFIG, ...SchemaGenerator.list('选项')],
  instance: {
    type: 'form',
    componentName: 'SchemaAlignPanel',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE
      }
    },
    children: []
  }
};

export default manifest;
