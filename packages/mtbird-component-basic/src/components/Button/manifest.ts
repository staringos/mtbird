import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { SchemaGenerator, COMPONENT } from '@mtbird/core';
import { BUTTON_EVENT_CLICK_OPTIONS, BUTTON_SHAPE_OPTIONS, BUTTON_TYPE_OPTIONS } from './constants';

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'component',
  componentName: 'Button',
  title: '按钮',
  icon: 'mtbird-mtbutton',
  desc: '',
  category: 'basic',
  schema: [
    ...COMPONENT.SCHEMA_COMPONENT_BASIC_STYLE,
    SchemaGenerator.select('按钮类型', 'props.type', BUTTON_TYPE_OPTIONS),
    SchemaGenerator.select('按钮形状', 'props.shape', BUTTON_SHAPE_OPTIONS),
    SchemaGenerator.select('按钮事件', 'events.click.type', BUTTON_EVENT_CLICK_OPTIONS),
    SchemaGenerator.input('按钮文字', 'children'),
    ...COMPONENT.SCHEMA_EVENT_CLICK
  ],
  instance: {
    type: 'component',
    componentName: 'Button',
    props: {
      style: {
        ...COMPONENT.COMPONENT_DEFAULT_STYLE,
        height: 40,
        width: 80
      },
      type: 'primary',
      shape: 'default'
    },
    events: {
      click: {
        type: 'link',
        src: 'http://staringos.com'
      }
    },
    editing: {
      showMask: true,
      maskText: '双击操作'
    },
    children: '按钮'
  }
};

export default manifest;
