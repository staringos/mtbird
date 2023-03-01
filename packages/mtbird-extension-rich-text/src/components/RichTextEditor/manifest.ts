import { SchemaGenerator, COMPONENT } from "@mtbird/core";
import { IComponentManifest, IComponentInstanceForm } from "@mtbird/shared";

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "component",
  componentName: "RichTextEditor",
  title: "富文本",
  icon: "mtbird-mtbutton",
  desc: "",
  category: "extension",
  schema: [
    ...COMPONENT.SCHEMA_COMPONENT_BASIC_STYLE,
    SchemaGenerator.input("按钮文字", "children"),
  ],
  instance: {
    type: "form",
    componentName: "RichTextEditor",
    props: {
      style: {
        ...COMPONENT.COMPONENT_DEFAULT_STYLE,
        height: 260,
        width: 370,
      },
      type: "primary",
      shape: "default",
    },
    formConfig: {
      keyPath: "children",
    },
    children: '这是一段<span style="font-weight: 700;">富文本</span>信息',
  },
};

export default manifest;
