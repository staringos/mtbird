import type { IComponentManifest, IComponentInstance } from "@mtbird/shared";
import { COMPONENT } from "@mtbird/core";
import { generateUpload } from "../../utils";
const { COMPONENT_DEFAULT_STYLE, SCHEMA_COMPONENT_BASIC_STYLE } = COMPONENT;

const manifest: IComponentManifest<IComponentInstance> = {
  type: "component",
  componentName: "Image",
  title: "图片",
  icon: "mtbird-image",
  desc: "",
  category: "basic",
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    generateUpload("图片地址", "props.src"),
  ],
  instance: {
    type: "component",
    componentName: "Image",
    props: {
      src: "https://mtbird-cdn.staringos.com/13531471671-1141212-4404-1111116-2721310171311016111.png",
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: 105,
        width: 200,
      },
    },
    children: [],
  },
};

export default manifest;
