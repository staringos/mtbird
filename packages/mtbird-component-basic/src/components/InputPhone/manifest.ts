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
  componentName: "InputPhone",
  title: "手机号",
  icon: "mtbird-input",
  desc: "",
  category: "form",
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_FORM_CONFIG],
  instance: {
    type: "form",
    componentName: "InputPhone",
    formConfig: {
      label: "手机号",
      componentProps: {
        placeholder: "请输入电话",
      },
      rules: [
        {
          pattern:
            /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/,
          message: "请输入正确的手机号",
        },
      ],
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
