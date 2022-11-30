import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT, SchemaGenerator } from '@mtbird/core';
const { COMPONENT_DEFAULT_STYLE, DEFAULT_OPTIONS, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_FORM_CONFIG } = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'component',
  componentName: 'Select',
  title: '下拉框',
  icon: 'mtbird-metroselect_m_back',
  desc: '',
  category: 'form',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_FORM_CONFIG, ...SchemaGenerator.list('选项')],
  instance: {
    type: 'form',
    componentName: 'Select',
    formConfig: {
      label: '文本',
      componentProps: {
        placeholder: '请输入文本'
      }
    },
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE
        // height: 35
      }
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
