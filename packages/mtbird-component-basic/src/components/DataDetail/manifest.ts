import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT, SchemaGenerator } from '@mtbird/core';
const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_GRID_LAYOUT } = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'component',
  componentName: 'DataDetail',
  title: '数据详情',
  icon: 'mtbird-metroselect_m_back',
  desc: '',
  category: 'basic',
  subCategory: 'data',
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_GRID_LAYOUT, SchemaGenerator.inputNumber('间距', 'pattern.spacing')],
  instance: {
    type: 'component',
    componentName: 'DataDetail',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        left: 10,
        top: 10,
        height: 400,
        width: 355,
        display: 'flex',
        flexFlow: 'wrap',
        overflowY: 'auto'
      }
    },
    data: {
      type: 'model',
      targetId: 'clbkdi8rb009ds6aadqodj8qz'
    },
    pattern: {
      spacing: 10
    },
    layout: 'flex',
    children: [
      SchemaGenerator.container(
        [
          SchemaGenerator.image(
            '${{$maps1Data.data.headImage}}',
            {
              top: 0,
              left: 0,
              right: 0,
              width: 173,
              bottom: 0,
              height: 141,
              position: 'absolute',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            },
            {
              'data.fieldId': 'headImage'
            }
          ),
          SchemaGenerator.text(
            '${{$maps1Data.data.productName}}',
            {
              top: 156,
              left: 17,
              right: -17,
              width: 69,
              bottom: -156,
              height: 30,
              position: 'absolute',
              textAlign: 'left',
              fontWeight: 700
            },
            {
              'data.fieldId': 'productName'
            }
          ),
          SchemaGenerator.text(
            '¥ <strong><span style="color: #ff0000">${{$maps1Data.data.price}}</span></strong>',
            {
              top: 156,
              left: 96,
              color: 'rgba(208,2,27,1)',
              right: -96,
              width: 67,
              bottom: -156,
              height: 30,
              position: 'absolute',
              textAlign: 'right',
              fontWeight: 700
            },
            {
              'data.fieldId': 'price'
            }
          )
        ],
        { width: 172.5, height: 200 },
        {
          background: 'var(--gray-1)',
          position: 'relative',
          flexWrap: 'wrap',
          width: 172.5,
          height: 200,
          borderRadius: '10px',
          backgroundColor: 'rgba(245,245,250,1)'
        }
      )
    ]
  }
};

export default manifest;
