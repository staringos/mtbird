import React from "react";
import { Spin } from "antd";
import styles from "./style.module.css";

interface IProps {
  spinning?: boolean;
}

const Loading = ({ spinning }: IProps) => {
  return <Spin className={styles.spin} spinning={spinning} />;
};

export default Loading;
