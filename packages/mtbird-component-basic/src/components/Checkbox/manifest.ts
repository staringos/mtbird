import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { COMPONENT, SchemaGenerator } from "@mtbird/core";

const {
  COMPONENT_DEFAULT_STYLE,
  DEFAULT_OPTIONS,
  SCHEMA_COMPONENT_BASIC_STYLE,
  SCHEMA_FORM_CONFIG,
} = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "form",
  componentName: "Checkbox",
  title: "多选框",
  icon: "mtbird-CheckboxChecked",
  desc: "",
  category: "form",
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    ...SCHEMA_FORM_CONFIG,
    ...SchemaGenerator.list("选项"),
  ],
  instance: {
    type: "form",
    componentName: "Checkbox",
    data: {
      options: DEFAULT_OPTIONS,
    },
    formConfig: {
      label: "文本",
      componentName: null,
      keyPath: "multi",
    },
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
      },
    },
    editing: {
      showMask: true,
    },
    children: [],
  },
};

export default manifest;
