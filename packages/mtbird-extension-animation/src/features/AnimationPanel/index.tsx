import React from "react";
import { Switch } from "antd";
import styles from "./style.module.less";
import { ANIMATE_LIST } from "../../constants";
import { IExtensionContext } from "@mtbird/shared";
import AttributeForm from "../AttributeForm";
import CategoryPanel, { Animation } from "../CategoryPanel";
import manifest from "../../../manifest.json";

import isArray from "lodash/isArray";
import get from "lodash/get";

const AnimationPanel = ({ context }: { context: IExtensionContext }) => {
  const currentFirstComponent = isArray(context.currentComponent)
    ? context.currentComponent[0]
    : context.currentComponent;
  const currentAni = get(currentFirstComponent, "pattern.animate") || {};
  const handleToggleAnimate = (e: boolean) => {
    context.onChangeValue("pattern.animate.open", e);
    if (e) {
      context.injectRenderPipe(manifest.name, "animate");
    } else {
      context.removeRenderPipe(manifest.name, "animate");
    }
  };

  const handleTypeSelect = (ani: Animation) => {
    context.onChangeValue("pattern.animate.type", ani.type);
  };

  return (
    <div className={styles.animationPanel}>
      <div className={styles.animationHeader}>
        <span className={styles.label}>开启动画</span>
        <Switch checked={currentAni.open} onChange={handleToggleAnimate} />
      </div>
      {currentAni.open && (
        <div className={styles.categoryList}>
          {ANIMATE_LIST.map((category, i) => {
            return (
              <CategoryPanel
                currentType={get(currentFirstComponent, "pattern.animate.type")}
                category={category}
                key={i}
                onSelect={handleTypeSelect}
              />
            );
          })}
        </div>
      )}
      {currentAni.open && <div className={styles.splitLine}></div>}
      {currentAni.open && (
        <AttributeForm value={currentAni} onChange={context.onChangeValue} />
      )}
    </div>
  );
};

export default AnimationPanel;
