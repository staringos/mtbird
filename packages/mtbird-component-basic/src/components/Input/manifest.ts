import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { COMPONENT } from "@mtbird/core";

const {
  COMPONENT_DEFAULT_STYLE,
  SCHEMA_COMPONENT_BASIC_STYLE,
  SCHEMA_FORM_CONFIG,
} = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "form",
  componentName: "Input",
  title: "输入框",
  icon: "mtbird-input",
  desc: "",
  category: "form",
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_FORM_CONFIG],
  instance: {
    type: "form",
    componentName: "Input",
    formConfig: {
      label: "文本",
      componentProps: {
        placeholder: "请输入文本",
        style: {
          height: 25,
        },
      },
    },
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        // height: 35
      },
    },
    editing: {
      showMask: true,
    },
    children: [],
  },
};

export default manifest;
