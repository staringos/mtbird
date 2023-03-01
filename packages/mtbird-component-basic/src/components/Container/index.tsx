import { IComponentProps } from "@mtbird/shared/src/types/Component";
import React from "react";
import manifest from "./manifest";

const Container = ({ style, children, className }: IComponentProps) => {
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

Container.manifest = manifest;

export default Container;
