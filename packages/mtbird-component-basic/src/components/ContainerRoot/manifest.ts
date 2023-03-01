import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { COMPONENT } from "@mtbird/core";

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "container",
  componentName: "ContainerRoot",
  title: "根组件",
  icon: "mtbird-layout",
  desc: "",
  hideInToolbar: true,
  schema: [...COMPONENT.SCHEMA_CONTAINER_BASIC_STYLE],
  category: "basic",
  instance: {
    type: "container",
    componentName: "ContainerRoot",
    layout: "flex",
    props: {
      style: {
        position: "relative",
        height: 500,
      },
    },
    children: [],
  },
};

export default manifest;
