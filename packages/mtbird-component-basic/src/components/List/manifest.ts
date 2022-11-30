import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT, SchemaGenerator } from '@mtbird/core';
const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE } = COMPONENT;

const DATA_TYPE_OPTIONS = [
  {
    label: '数据模型',
    value: 'model'
  },
  {
    label: '表单',
    value: 'form'
  },
  {
    label: '实体',
    value: 'entity'
  }
];

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'component',
  componentName: 'List',
  title: '列表',
  icon: 'mtbird-metroselect_m_back',
  desc: '',
  category: 'basic',
  subCategory: 'data',
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    SchemaGenerator.collapsePanel('数据', [
      SchemaGenerator.select('数据类型', 'data.type', DATA_TYPE_OPTIONS),
      SchemaGenerator.select('模型', 'data.targetId', DATA_TYPE_OPTIONS)
    ]),
    SchemaGenerator.collapsePanel('列表', [
      SchemaGenerator.switch('分页', 'data.features.pagination', DATA_TYPE_OPTIONS),
      SchemaGenerator.switch('新增', 'data.features.add', DATA_TYPE_OPTIONS),
      SchemaGenerator.switch('删除', 'data.features.delete', DATA_TYPE_OPTIONS),
      SchemaGenerator.switch('修改', 'data.features.modify', DATA_TYPE_OPTIONS)
    ])
  ],
  instance: {
    type: 'component',
    componentName: 'List',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 200,
        width: 260
      }
    },
    formConfig: {
      label: '列表',
      keyPath: 'data.options'
    },
    data: {
      entity: [
        {
          title: '显示值',
          keyPath: 'label',
          type: 'string',
          default: '',
          isRequired: true
        },
        {
          title: '实际值',
          keyPath: 'value',
          type: 'string',
          default: '',
          isRequired: true
        }
      ]
    },
    children: []
  }
};

export default manifest;
