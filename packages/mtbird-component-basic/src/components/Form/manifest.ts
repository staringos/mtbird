import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { COMPONENT, SchemaGenerator } from "@mtbird/core";
const { SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_LAYOUT } = COMPONENT;

const formLayout = [
  {
    label: "水平",
    value: "horizontal",
  },
  {
    label: "垂直",
    value: "vertical",
  },
];

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "container",
  componentName: "Form",
  title: "表单",
  icon: "mtbird-form",
  desc: "",
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    ...SCHEMA_LAYOUT,
    SchemaGenerator.select("表单布局", "formConfig.formLayout", formLayout, {}),
    SchemaGenerator.switch("允许重复提交", "formConfig.duplicateSubmit"),
    SchemaGenerator.richTextEditor("重复提交提示文案", "formConfig.duplicateSubmitText"),
  ],
  category: "basic",
  subCategory: "data",
  instance: {
    type: "form",
    componentName: "Form",
    layout: "flex",
    formConfig: {
      formLayout: "horizontal",
      duplicateSubmit: true,
      duplicateSubmitText: "已提交"
    },
    props: {
      style: {
        position: "relative",
        width: 260,
        height: 300,
      },
    },
    children: [],
  },
};

export default manifest;
