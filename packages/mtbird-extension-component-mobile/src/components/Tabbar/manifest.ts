import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { COMPONENT, SchemaGenerator } from "@mtbird/core";
const {
  COMPONENT_DEFAULT_STYLE,
  SCHEMA_COMPONENT_BASIC_STYLE,
  SCHEMA_FORM_CONFIG,
  DEFAULT_ENTITIES,
} = COMPONENT;

const DEFAULT_TABBAR_OPTIONS = [
  {
    value: "home",
    label: "首页",
    isActive: true,
    icon: "mtbird-home",
  },
  {
    value: "home",
    label: "分类",
    icon: "mtbird-unorderedlist",
  },
  {
    value: "my",
    label: "我的",
    icon: "mtbird-user",
  },
];

const ENTITY = [
  ...DEFAULT_ENTITIES,
  {
    title: "图标",
    keyPath: "icon",
    type: "string",
    default: "",
    isRequired: false,
  },
  {
    title: "链接",
    keyPath: "href",
    type: "string",
    default: "",
    isRequired: false,
  },
];

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "component",
  componentName: "Tabbar",
  title: "底部菜单",
  icon: "mtbird-tabbar",
  desc: "",
  category: "basic",
  componentLib: "mobile",
  subCategory: "mobile",
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    ...SCHEMA_FORM_CONFIG,
    ...SchemaGenerator.list("Tab项", "data.options", ENTITY as any),
  ],
  instance: SchemaGenerator.containerBlock(
    [
      {
        type: "component",
        componentName: "Tabbar",
        props: {
          style: {
            ...COMPONENT_DEFAULT_STYLE,
            flex: 1,
            background: "white",
            border: "1px solid var(--gray-3)",
          },
        },
        data: {
          showIcon: true,
          iconType: "icon",
          options: DEFAULT_TABBAR_OPTIONS,
        },
        pattern: {
          sticky: {
            open: true,
            position: "bottom",
            horizontalMargin: 0,
            verticalMargin: 0,
          },
        },
        pipes: {
          render: {
            "mtbird-extension-sticky-panel-sticky": {
              name: "sticky",
              handler:
                '!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self)["mtbird-extension-sticky-panel-sticky"]=e()}(this,function(){"use strict";return function(t){var e=t.node,i=t.wrapperProps,n=t.isEdit,e=(e.pattern||{}).sticky;return e&&e.open&&!n&&(i.style.position="fixed","top"===e.position?i.style.top=e.verticalMargin:i.style.bottom=e.verticalMargin,"right"===e.position?i.style.right=e.horizontalMargin:i.style.left=e.horizontalMargin,i.style.zIndex=999,i.style.width||(i.style.width="100%")),t}});\n',
              extensionName: "mtbird-extension-sticky-panel",
            },
          },
        },
        editing: {
          showMask: true,
          maskText: "双击操作",
        },
        children: [],
      },
    ],
    {
      layout: "flex",
      "props.style.display": "flex",
      "props.style.height": "unset",
    }
  ),
};

export default manifest;
