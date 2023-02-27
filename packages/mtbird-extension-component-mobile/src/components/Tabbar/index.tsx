import React from "react";
import { IComponentProps } from "@mtbird/shared";
import styles from "./style.module.less";
import manifest from "./manifest";
import get from "lodash/get";

const Tabbar = ({ node, style }: IComponentProps) => {
  if (!node.data) return <div />;
  const { options, showIcon } = node.data;

  if (!options) return <div className={styles.tabbarWrapper} />;

  const borderTop = get(node, "props.style.border");

  return (
    <div
      className={styles.tabbarWrapper}
      style={{ ...style, borderTop, border: "unset" }}
    >
      {options.map((cur: Record<string, any>) => {
        return (
          <div
            className={
              styles.tabbarItem +
              " " +
              (cur.isActive ? styles.tabbarItemActive : "")
            }
            style={{ color: style.color, fontSize: style.fontSize }}
            onClick={() => cur.href && (location.href = cur.href)}
          >
            {showIcon && (!cur.iconType || cur.iconType === "icon") && (
              <i className={styles.tabbarIcon + ` mtbird-icon ${cur.icon}`} />
            )}
            {showIcon && cur.iconType === "image" && (
              <img className={styles.tabbarIconImage} src={cur.icon} />
            )}
            <span className={styles.tabbarTitle}>{cur.label}</span>
          </div>
        );
      })}
    </div>
  );
};

Tabbar.manifest = manifest;

export default Tabbar;
