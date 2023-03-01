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
  type: "component",
  componentName: "SchemaSpacingPanel",
  title: "间距面板",
  icon: "mtbird-metroselect_m_back",
  desc: "",
  category: "form",
  hideInToolbar: true,
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_FORM_CONFIG],
  instance: {
    type: "form",
    componentName: "SchemaSpacingPanel",
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
      },
    },
    formConfig: {
      keyPath: "props.style",
    },
    children: [],
  },
};

export default manifest;
