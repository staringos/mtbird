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
  componentName: "TextArea",
  title: "多行文本",
  icon: "mtbird-input",
  desc: "",
  category: "form",
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_FORM_CONFIG],
  instance: {
    type: "form",
    componentName: "TextArea",
    formConfig: {
      label: "多行文本",
      componentProps: {
        placeholder: "请输入文本",
      },
    },
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 100,
      },
    },
    editing: {
      showMask: true,
    },
    children: [],
  },
};

export default manifest;
