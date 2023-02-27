import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import {
  generateFormItem,
  generateFormItemSelect,
  generateInputComponent,
} from "../../../utils";
import { COMPONENT } from "@mtbird/core";

const { SCHEMA_CONTAINER_BASIC_STYLE, BUTTON_FORM_COMPONENT_NAME_OPTIONS } =
  COMPONENT;

import InputManifest from "../../Input/manifest";
import cloneDeep from "lodash/cloneDeep";

const defaultChild = cloneDeep(InputManifest.instance);
defaultChild.props.style["flex"] = 1;
defaultChild.props.style["position"] = "relative";
delete defaultChild.props.style.width;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "form",
  componentName: "FormItem",
  title: "表单项",
  icon: "mtbird-mswitch",
  hideInToolbar: true,
  desc: "",
  schema: [
    ...SCHEMA_CONTAINER_BASIC_STYLE,
    generateFormItemSelect(
      "formConfig.componentName",
      "表单类型",
      BUTTON_FORM_COMPONENT_NAME_OPTIONS
    ),
    generateFormItem("字段名", null, [
      generateInputComponent("formConfig.keyPath"),
    ]),
  ],
  category: "form",
  instance: {
    type: "form",
    componentName: "FormItem",
    formConfig: {
      label: "文本",
      componentName: null,
      keyPath: "data.text",
    },
    props: {
      style: {
        position: "relative",
        height: 38,
      },
    },
    editing: {
      showMask: true,
    },
    children: [defaultChild],
  },
};

export default manifest;
