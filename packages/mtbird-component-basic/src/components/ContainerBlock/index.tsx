import React from "react";
import styles from "./style.module.less";
import manifest from "./manifest";
import { IComponentProps } from "@mtbird/shared";

const ContainerBlock = ({
  children,
  node,
  className,
  style,
}: IComponentProps) => {
  return (
    <div
      {...node.props}
      className={`${styles.containerBlock} ${className} ${node.props.className}`}
      style={style}
    >
      {children}
    </div>
  );
};

ContainerBlock.manifest = manifest;

export default ContainerBlock;
