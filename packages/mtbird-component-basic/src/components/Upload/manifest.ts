import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT } from '@mtbird/core';

const { COMPONENT_DEFAULT_STYLE, DEFAULT_OPTIONS, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_FORM_ITEM_COMPONENT_STYLE } = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'form',
  componentName: 'Upload',
  title: '上传',
  icon: 'mtbird-cloud-upload',
  desc: '',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE],
  instance: {
    type: 'form',
    componentName: 'Upload',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 100,
        width: 200
      }
    },
    formConfig: {
      label: '上传',
      componentProps: {
        style: SCHEMA_FORM_ITEM_COMPONENT_STYLE
      }
    },
    data: {
      options: DEFAULT_OPTIONS
    },
    children: []
  }
};

export default manifest;
