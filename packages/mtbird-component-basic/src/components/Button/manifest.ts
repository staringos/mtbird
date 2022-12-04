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
    COMPONENT.SCHEMA_EVENT_CLICK,
    SchemaGenerator.collapsePanel('按钮', [
      SchemaGenerator.select('类型', 'props.type', BUTTON_TYPE_OPTIONS),
      SchemaGenerator.select('形状', 'props.shape', BUTTON_SHAPE_OPTIONS),
      SchemaGenerator.select('事件', 'events.click.type', BUTTON_EVENT_CLICK_OPTIONS),
      SchemaGenerator.input('文字', 'children')
    ])
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
