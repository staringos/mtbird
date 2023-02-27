import { IComponentProps } from "@mtbird/shared/src/types/Component";
import React from "react";
import manifest from "./manifest";

const Image = ({ node, style }: IComponentProps) => {
  const { props } = node;
  return (
    <img
      src={props.src}
      style={style}
      width={props.style?.width}
      height={props.style?.height}
    />
  );
};

Image.manifest = manifest;

export default Image;
