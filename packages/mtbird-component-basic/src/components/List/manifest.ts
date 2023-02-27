import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { COMPONENT, SchemaGenerator } from "@mtbird/core";
const {
  COMPONENT_DEFAULT_STYLE,
  SCHEMA_COMPONENT_BASIC_STYLE,
  SCHEMA_DATA_BASIC,
} = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "component",
  componentName: "List",
  title: "列表",
  icon: "mtbird-metroselect_m_back",
  desc: "",
  category: "basic",
  subCategory: "data",
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    ...SCHEMA_DATA_BASIC,
    SchemaGenerator.collapsePanel("列表", [
      SchemaGenerator.switch("分页", "data.features.pagination"),
      SchemaGenerator.switch("新增", "data.features.add"),
      SchemaGenerator.switch("删除", "data.features.delete"),
      SchemaGenerator.switch("修改", "data.features.modify"),
    ]),
  ],
  instance: {
    type: "component",
    componentName: "List",
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 200,
        width: 260,
      },
    },
    formConfig: {
      label: "列表",
      keyPath: "data.options",
    },
    data: {
      entity: [
        {
          title: "显示名",
          keyPath: "label",
          type: "string",
          default: "",
          isRequired: true,
        },
        {
          title: "实际值",
          keyPath: "value",
          type: "string",
          default: "",
          isRequired: true,
        },
      ],
    },
    children: [],
  },
};

export default manifest;
