import React from "react";
import { IComponentProps } from "@mtbird/shared";
import Grid from "antd-mobile/es/components/Grid";
import manifest from "./manifest";
import styles from "./style.module.less";

const KingKong = ({ node }: IComponentProps) => {
  const { options } = node.data as any;
  return (
    <Grid columns={4} gap={8}>
      {options.map((op: any) => {
        return (
          <Grid.Item
            className={styles.gridItem}
            onClick={() => op.href && (location.href = op.href)}
          >
            <img src={op.imageUrl} style={{ width: 38, height: 38 }} />
            <span>{op.label}</span>
          </Grid.Item>
        );
      })}
    </Grid>
  );
};

KingKong.manifest = manifest;

export default KingKong;
