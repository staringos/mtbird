import { IComponentProps } from "@mtbird/shared/src/types/Component";
import React from "react";
import manifest from "./manifest";
import styles from "./style.module.less";
import set from "lodash/set";
import { IComponentInstance } from "@mtbird/shared";

const Modal = ({ style, children, node }: IComponentProps) => {
  return (
    <div
      style={{ ...style, ...node.props.node }}
      className={styles.modalMask + " " + node.className}
    >
      {children}
    </div>
  );
};

Modal.manifest = manifest;
Modal.initManifest = (component: IComponentInstance) => {
  set(
    component.children[0].children[0],
    "events.click.keyPath",
    `$modals.${component.id}`
  );
  set(
    component,
    "pattern.display",
    "function() { return ${{$modals." + component.id + "}}; }"
  );
  return component;
};

export default Modal;
