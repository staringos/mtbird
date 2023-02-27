import type { IComponentManifest, IComponentInstance } from "@mtbird/shared";
import { COMPONENT } from "@mtbird/core";

const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE, SCHEMA_LAYOUT } =
  COMPONENT;

const manifest: IComponentManifest<IComponentInstance> = {
  type: "container",
  componentName: "Container",
  title: "容器",
  icon: "mtbird-border",
  desc: "",
  category: "basic",
  subCategory: "container",
  schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...SCHEMA_LAYOUT],
  instance: {
    type: "container",
    componentName: "Container",
    layout: "absolute",
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 100,
        width: 80,
      },
    },
    children: [],
  },
};

export default manifest;
