import { IComponentProps } from "@mtbird/shared";
import React from "react";
import manifest from "./manifest";
import styles from "./style.module.less";

const Navbar = ({ node, style }: IComponentProps) => {
  const { title, subTitle, hasBackButton, backHref } = node.data as any;
  return (
    <div
      className={styles.navbarWrapper}
      style={{ ...style, borderBottom: style.border, border: "unset" }}
    >
      <div className={styles.headerBackButton}>
        {hasBackButton && (
          <i
            className="mtbird-icon mtbird-left"
            onClick={() => backHref && (location.href = backHref)}
          />
        )}
      </div>

      <div className={styles.headerTitleArea}>
        <span className={styles.headerTitle}>{title}</span>
        {subTitle && <span className={styles.headerSubTitle}>{subTitle}</span>}
      </div>
      <div className={styles.headerExtra}></div>
    </div>
  );
};

Navbar.manifest = manifest;

export default Navbar;
