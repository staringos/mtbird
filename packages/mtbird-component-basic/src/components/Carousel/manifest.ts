import type { IComponentManifest, IComponentInstance } from '@mtbird/shared';
import { COMPONENT, SchemaGenerator } from '@mtbird/core';
const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_FORM_CONFIG, DEFAULT_ENTITIES } = COMPONENT;

const DEFAULT_CAROUSEL_OPTIONS = [
  {
    label: '',
    value: 1,
    imageUrl:
      'https://mtbird-cdn.staringos.com/product/banner/%E5%8D%A1%E9%80%9A%E6%96%B0%E5%93%81%E7%9B%B4%E6%92%AD%E7%8B%82%E6%AC%A2%E5%A4%A7%E4%BF%83%E4%BF%83%E9%94%80%E6%B5%B7%E6%8A%A5__2022-11-23%2B16_09_04.png',
    href: ''
  },
  {
    label: '',
    value: 1,
    imageUrl:
      'https://mtbird-cdn.staringos.com/product/banner/%E6%BD%AE%E6%9C%8D%E5%A4%A7%E4%BF%83%E5%9B%BE%E6%96%87%E7%94%B5%E5%95%86%E6%A8%AA%E7%89%88%E6%B5%B7%E6%8A%A5__2022-11-23%2B16_09_22.png',
    href: ''
  },
  {
    label: '',
    value: 1,
    imageUrl:
      'https://mtbird-cdn.staringos.com/product/banner/%E7%AE%80%E7%BA%A6%E9%A3%8E%E9%80%9A%E7%94%A8%E5%91%A8%E5%B9%B4%E5%BA%97%E5%BA%86%E7%94%B5%E5%95%86%E6%A8%AA%E7%89%88%E6%B5%B7%E6%8A%A5__2022-11-23%2B16_08_13.jpeg',
    href: ''
  }
];

const POS_OPTIONS = [
  {
    label: '左侧',
    value: 'left'
  },
  {
    label: '顶部',
    value: 'top'
  },
  {
    label: '右侧',
    value: 'right'
  },
  {
    label: '底部',
    value: 'bottom'
  }
];

const CAROUSEL_ENTITY = [
  ...DEFAULT_ENTITIES,
  {
    title: '图片地址',
    keyPath: 'imageUrl',
    type: 'string',
    default: '',
    isRequired: true
  },
  {
    title: '跳转链接',
    keyPath: 'href',
    type: 'string',
    default: '',
    isRequired: true
  }
];

const manifest: IComponentManifest<IComponentInstance> = {
  type: 'component',
  componentName: 'Carousel',
  title: '轮播图',
  icon: 'mtbird-carousel',
  desc: '',
  category: 'basic',
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    ...SCHEMA_FORM_CONFIG,
    SchemaGenerator.collapsePanel(
      '轮播图配置',
      [
        SchemaGenerator.switch('自动播放', 'props.autoplay'),
        SchemaGenerator.select('控制位置', 'props.dotPosition', POS_OPTIONS),
        SchemaGenerator.switch('显示控制', 'props.dots'),
        ...SchemaGenerator.list('选项', 'data.options', CAROUSEL_ENTITY)
      ],
      true
    )
  ],
  instance: {
    type: 'component',
    componentName: 'Carousel',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        width: 375,
        height: 200
      },
      dotPosition: 'bottom',
      dots: true
    },
    data: {
      options: DEFAULT_CAROUSEL_OPTIONS
    },
    editing: {
      showMask: true
    },
    children: []
  }
};

export default manifest;
