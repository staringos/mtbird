import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT } from '@mtbird/core';

const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_FORM_CONFIG } = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'form',
  componentName: 'Switch',
  title: '开关',
  icon: 'mtbird-switch',
  desc: '',
  category: 'form',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_FORM_CONFIG],
  instance: {
    type: 'form',
    componentName: 'Switch',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE
      }
    },
    formConfig: {
      label: '开关'
    },
    editing: {
      showMask: true
    },
    children: []
  }
};

export default manifest;
