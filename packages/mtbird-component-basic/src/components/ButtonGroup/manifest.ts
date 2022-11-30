import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { generateList } from '../../utils';
import { COMPONENT } from '@mtbird/core';

const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE } = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'component',
  componentName: 'ButtonGroup',
  title: '按钮组',
  icon: 'mtbird-icf_button_group',
  desc: '',
  category: 'basic',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...generateList('选项')],
  instance: {
    type: 'component',
    componentName: 'ButtonGroup',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 100,
        width: 200
      }
    },
    data: {
      options: [
        {
          label: '按钮1',
          value: 1
        },
        {
          label: '按钮2',
          value: 2
        }
      ]
    },
    children: []
  }
};

export default manifest;
