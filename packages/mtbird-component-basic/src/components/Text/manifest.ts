import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { SchemaGenerator, COMPONENT } from "@mtbird/core";
const { COMPONENT_DEFAULT_STYLE } = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "component",
  componentName: "Text",
  title: "文本",
  icon: "mtbird-text",
  desc: "",
  category: "basic",
  schema: [
    ...COMPONENT.SCHEMA_COMPONENT_BASIC_STYLE,
    // SchemaGenerator.splitLine(),
    SchemaGenerator.title("文本"),
    SchemaGenerator.richTextEditor("", "children"),
  ],
  instance: {
    type: "component",
    componentName: "Text",
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 100,
        width: 200,
      },
    },
    children: "<p>这是一段文本呀呀呀</p>",
  },
};

export default manifest;
