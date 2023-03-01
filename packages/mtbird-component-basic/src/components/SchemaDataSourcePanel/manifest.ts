import type { IComponentManifest, IComponentInstance } from "@mtbird/shared";
import { COMPONENT } from "@mtbird/core";
const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE } = COMPONENT;

const manifest: IComponentManifest<IComponentInstance> = {
  type: "component",
  componentName: "SchemaDataSourcePanel",
  title: "数据源配置",
  icon: "mtbird-metroselect_m_back",
  desc: "",
  category: "form",
  hideInToolbar: true,
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE],
  instance: {
    type: "form",
    componentName: "SchemaDataSourcePanel",
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
      },
    },
    children: [],
  },
};

export default manifest;
