import styles from "./style.module.less";
import React from "react";

interface IProps {
  icon: string;
  title: string;
  action: () => void;
  isActive: () => boolean;
}

export default ({ icon, title, action, isActive = () => false }: IProps) => (
  <button
    className={`${styles.menuItem} ${isActive() ? styles.isActive : ""}`}
    onClick={action}
    title={title}
  >
    <i className={icon} />
  </button>
);
