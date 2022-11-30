import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT } from '@mtbird/core';
import { generateList } from '../../utils';

const { COMPONENT_DEFAULT_STYLE, DEFAULT_OPTIONS, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_FORM_CONFIG } = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'form',
  componentName: 'Radio',
  title: '单选框',
  icon: 'mtbird-radio',
  desc: '',
  category: 'form',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_FORM_CONFIG, ...generateList('选项')],
  instance: {
    type: 'form',
    componentName: 'Radio',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE
      }
    },
    formConfig: {
      label: '单选框'
    },
    data: {
      options: DEFAULT_OPTIONS
    },
    editing: {
      showMask: true
    },
    children: []
  }
};

export default manifest;
