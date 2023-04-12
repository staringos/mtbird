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
  title: "H5列表",
  icon: "mtbird-header",
  desc: "",
  category: "basic",
  subCategory: "mobile",
  componentLib: "mobile",
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    ...SCHEMA_FORM_CONFIG,
    SchemaGenerator.collapsePanel("H5列表设置", [], true),
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
            border: "1px solid var(--gray-6)",
          },
        },
        data: {
          title: "首页",
          subTitle: "星搭精卫",
          hasBackButton: true,
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
