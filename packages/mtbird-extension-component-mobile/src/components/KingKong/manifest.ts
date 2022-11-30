import type { IComponentManifest, IComponentInstanceForm } from '@mtbird/shared';
import { COMPONENT, SchemaGenerator } from '@mtbird/core';
const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_FORM_CONFIG, DEFAULT_ENTITIES } = COMPONENT;

const KINGKONG_OPTIONS = [
  ...DEFAULT_ENTITIES,
  {
    title: '图标',
    keyPath: 'imageUrl',
    type: 'string',
    default: '',
    isRequired: false
  },
  {
    title: '链接',
    keyPath: 'href',
    type: 'string',
    default: '',
    isRequired: false
  }
];

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: 'component',
  componentName: 'KingKong',
  title: '金刚区',
  icon: 'mtbird-header',
  desc: '',
  category: 'basic',
  subCategory: 'mobile',
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    ...SCHEMA_FORM_CONFIG,
    SchemaGenerator.collapsePanel('金刚区设置', [...SchemaGenerator.list('金刚区菜单', 'data.options', KINGKONG_OPTIONS)], true)
  ],
  instance: {
    type: 'component',
    componentName: 'KingKong',
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        background: 'white',
        border: '1px solid var(--gray-6)',
        height: 126,
        width: 375
      }
    },
    data: {
      options: [
        {
          label: '活动优惠',
          imageUrl: 'https://mtbird-cdn.staringos.com/%E6%8A%A5%E5%91%8A.png',
          href: ''
        },
        {
          label: '万人团购',
          imageUrl: 'https://mtbird-cdn.staringos.com/product/icon/chongzhi.png',
          href: ''
        },
        {
          label: '水果生鲜',
          imageUrl: 'https://mtbird-cdn.staringos.com/product/icon/gouwu.png',
          href: ''
        },
        {
          label: '特价特卖',
          imageUrl: 'https://mtbird-cdn.staringos.com/product/icon/huiyuanka.png',
          href: ''
        },
        {
          label: '家电',
          imageUrl: 'https://mtbird-cdn.staringos.com/product/icon/shishang.png',
          href: ''
        },
        {
          label: '超市百货',
          imageUrl: 'https://mtbird-cdn.staringos.com/product/icon/youxi.png',
          href: ''
        },
        {
          label: '特价服装',
          imageUrl: 'https://mtbird-cdn.staringos.com/product/icon/yuanbao.png',
          href: ''
        },
        {
          label: '礼品专区',
          imageUrl: 'https://mtbird-cdn.staringos.com/product/icon/gongzi.png',
          href: ''
        }
      ]
    },
    editing: {
      showMask: true,
      maskText: '双击操作'
    },
    children: []
  }
};

export default manifest;
