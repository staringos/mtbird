import { IComponentProps } from "@mtbird/shared/src/types/Component";
import React from "react";
import manifest from "./manifest";

const Container = ({ style, children }: IComponentProps) => {
  return <div style={style}>{children}</div>;
};

Container.manifest = manifest;

export default Container;
