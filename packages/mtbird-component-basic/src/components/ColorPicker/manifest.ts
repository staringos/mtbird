import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT } from '@mtbird/core';

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'form',
  componentName: 'ColorPicker',
  title: '颜色选择',
  icon: 'mtbird-Color',
  desc: '',
  category: 'form',
  schema: [...COMPONENT.SCHEMA_CONTAINER_BASIC_STYLE, ...COMPONENT.SCHEMA_FORM_CONFIG],
  instance: {
    type: 'component',
    componentName: 'ColorPicker',
    formConfig: {
      label: '颜色',
      componentProps: {
        style: {}
      },
      labelStyle: {}
    },
    props: {
      style: {}
    },
    children: []
  }
};

export default manifest;
