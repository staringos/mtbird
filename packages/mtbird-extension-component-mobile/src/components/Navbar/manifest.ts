import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { COMPONENT, SchemaGenerator } from "@mtbird/core";
const {
  COMPONENT_DEFAULT_STYLE,
  SCHEMA_COMPONENT_BASIC_STYLE,
  SCHEMA_FORM_CONFIG,
} = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "component",
  componentName: "Navbar",
  title: "导航栏",
  icon: "mtbird-header",
  desc: "",
  category: "basic",
  subCategory: "mobile",
  componentLib: "mobile",
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    ...SCHEMA_FORM_CONFIG,
    SchemaGenerator.collapsePanel(
      "导航栏设置",
      [
        SchemaGenerator.input("标题", "data.title"),
        SchemaGenerator.input("子标题", "data.subTitle"),
        SchemaGenerator.switch("显示返回", "data.hasBackButton"),
        SchemaGenerator.input("返回地址", "data.backHref"),
      ],
      true
    ),
  ],
  instance: SchemaGenerator.containerBlock(
    [
      {
        type: "component",
        componentName: "Navbar",
        props: {
          style: {
            ...COMPONENT_DEFAULT_STYLE,
            flex: 1,
            background: "white",
            border: "1px solid var(--gray-3)",
          },
        },
        data: {
          title: "首页",
          subTitle: "星搭精卫",
          hasBackButton: true,
        },
        pattern: {
          sticky: {
            open: true,
            position: "top",
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
      "props.style.height": 50,
      "props.style.display": "flex",
    }
  ),
};

export default manifest;
