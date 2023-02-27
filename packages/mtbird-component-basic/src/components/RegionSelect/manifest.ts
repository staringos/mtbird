import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { COMPONENT } from "@mtbird/core";
const {
  COMPONENT_DEFAULT_STYLE,
  DEFAULT_OPTIONS,
  SCHEMA_COMPONENT_BASIC_STYLE,
  SCHEMA_FORM_CONFIG,
} = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "form",
  componentName: "RegionSelect",
  title: "省市选择",
  icon: "mtbird-metroselect_m_back",
  desc: "",
  category: "form",
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_FORM_CONFIG],
  instance: {
    type: "form",
    componentName: "RegionSelect",
    formConfig: {
      rulesVerifyInside: true,
      label: "地区",
    },
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
      },
    },
    data: {
      options: DEFAULT_OPTIONS,
    },
    editing: {
      showMask: true,
    },
    children: [],
  },
};

export default manifest;
