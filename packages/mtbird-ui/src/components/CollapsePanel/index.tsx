import React, { ReactNode, useState } from "react";
import styles from "./style.module.less";

interface IProps {
  children: ReactNode;
  title: string;
  style?: any;
  defaultOpen: boolean;
  id: string;
}

const CollapsePanelComponent = ({
  children,
  title,
  style,
  defaultOpen,
  id,
}: IProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div style={style} className={styles.collapsePanel} id={id}>
      <div
        className={styles.panelHeader}
        onClick={handleToggleOpen}
        style={style ? { fontSize: style.fontSize, color: style.color } : {}}
      >
        {open ? (
          <i className="mtbird-icon mtbird-up" />
        ) : (
          <i className="mtbird-icon mtbird-down" />
        )}{" "}
        {title || "标题"}
      </div>
      <div className={styles.panelContent + " " + (open ? styles.show : "")}>
        {children}
      </div>
    </div>
  );
};

export default CollapsePanelComponent;
