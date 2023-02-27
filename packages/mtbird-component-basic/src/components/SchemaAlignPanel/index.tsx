import React from "react";
import { Button, Tooltip } from "antd";
import { ISchemaProps } from "../../../types/schema";
import styles from "./style.module.less";
import get from "lodash/get";
import minBy from "lodash/minBy";
import maxBy from "lodash/maxBy";
import { IComponentInstance } from "@mtbird/shared/dist/types";
import manifest from "./manifest";

const BUTTONS = [
  {
    key: "align-left",
    icon: "mtbird-align-left1",
    title: "左对齐",
  },
  {
    key: "align-center",
    icon: "mtbird-align-center1",
    title: "水平居中",
  },
  {
    key: "align-right",
    icon: "mtbird-align-right1",
    title: "右对齐",
  },
  {
    key: "align-top",
    icon: "mtbird-align-top",
    title: "置顶",
  },
  {
    key: "align-middle",
    icon: "mtbird-align-middle",
    title: "水平居中",
  },
  {
    key: "align-bottom",
    icon: "mtbird-align-bottom",
    title: "置底",
  },
];

const SchemaAlignPanel = (allProps: ISchemaProps) => {
  const { dataSource, parent } = allProps;
  const currentComponent = dataSource.state["currentComponent"];

  const alignWithParent = (key: string) => {
    const current = dataSource.getValue(0);
    const dom = document.getElementById(current.parent);
    if (!dom) return;
    const { offsetWidth, offsetHeight } = dom;

    switch (key) {
      case "align-left":
        dataSource.setState(
          "props.style.left",
          get(parent, "props.style.left") || 0
        );
        break;
      case "align-center":
        dataSource.setState(
          "props.style.left",
          offsetWidth / 2 -
            (get(current, "props.style.width") || offsetWidth) / 2 || 0
        );
        break;
      case "align-right":
        dataSource.setState(
          "props.style.left",
          offsetWidth - (get(current, "props.style.width") || offsetWidth) || 0
        );
        break;
      case "align-top":
        dataSource.setState(
          "props.style.top",
          get(parent, "props.style.top") || 0
        );
        break;
      case "align-middle":
        dataSource.setState(
          "props.style.top",
          offsetHeight / 2 -
            (get(current, "props.style.height") || offsetHeight) / 2 || 0
        );
        break;
      case "align-bottom":
        dataSource.setState(
          "props.style.top",
          offsetHeight - (get(current, "props.style.height") || offsetHeight) ||
            0
        );
        break;
    }
  };

  const alignWithEachOther = (key: string) => {
    switch (key) {
      case "align-left":
        const left = minBy(currentComponent, (n: IComponentInstance) =>
          get(n, "props.style.left")
        );
        dataSource.setState("props.style.left", get(left, "props.style.left"));
        break;
      case "align-center":
        let minLeft = minBy(currentComponent, (n: IComponentInstance) =>
          get(n, "props.style.left")
        );
        let maxRight = maxBy(
          currentComponent,
          (n: IComponentInstance) =>
            get(n, "props.style.left") + get(n, "props.style.width")
        );

        minLeft = get(minLeft, "props.style.left");
        maxRight =
          get(maxRight, "props.style.left") +
          get(maxRight, "props.style.width");

        currentComponent.forEach((cur: IComponentInstance) => {
          const rectWidth = (maxRight - minLeft) / 2;
          dataSource.setState(
            "props.style.left",
            rectWidth - get(cur, "props.style.width") / 2 + minLeft,
            cur.id
          );
        });
        break;
      case "align-right":
        const mostLeft = maxBy(currentComponent, (n: IComponentInstance) =>
          get(n, "props.style.left")
        );
        dataSource.setState(
          "props.style.left",
          get(mostLeft, "props.style.left")
        );
        break;
      case "align-top":
        const top = minBy(currentComponent, (n: IComponentInstance) =>
          get(n, "props.style.top")
        );
        dataSource.setState("props.style.top", get(top, "props.style.top"));
        break;
      case "align-middle":
        let minTop = minBy(currentComponent, (n: IComponentInstance) =>
          get(n, "props.style.top")
        );
        let maxTop = maxBy(
          currentComponent,
          (n: IComponentInstance) =>
            get(n, "props.style.top") + get(n, "props.style.height")
        );

        minTop = get(minTop, "props.style.top");
        maxTop =
          get(maxTop, "props.style.top") + get(maxTop, "props.style.height");

        currentComponent.forEach((cur: IComponentInstance) => {
          const rectHeight = (maxTop - minTop) / 2;
          dataSource.setState(
            "props.style.top",
            rectHeight - get(cur, "props.style.height") / 2 + minTop,
            cur.id
          );
        });
        break;
      case "align-bottom":
        const mostTop = maxBy(currentComponent, (n: IComponentInstance) =>
          get(n, "props.style.top")
        );
        dataSource.setState("props.style.top", get(mostTop, "props.style.top"));
        break;
    }
  };

  const handleClick = (key: string) => {
    if (currentComponent.length === 1) {
      alignWithParent(key);
    } else {
      alignWithEachOther(key);
    }
  };

  return (
    <div className={styles.schemaAlignPanel}>
      {BUTTONS.map((cur) => {
        return (
          <Tooltip placement="bottomLeft" title={cur.title} key={cur.key}>
            <Button
              size="middle"
              onClick={() => handleClick(cur.key)}
              type="text"
            >
              <i className={`mtbird-icon ${cur.icon}`} />
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
};

SchemaAlignPanel.manifest = manifest;

export default SchemaAlignPanel;
