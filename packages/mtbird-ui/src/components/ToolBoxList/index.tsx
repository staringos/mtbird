import {
  IComponentInstance,
  IComponentManifest,
} from "@mtbird/shared/dist/types";
import React from "react";
import ToolBox from "../ToolBox";
import ToolBoxForm from "../ToolBoxForm";
import styles from "./style.module.less";

interface IProps {
  list: IComponentManifest<IComponentInstance>[];
  isForm?: boolean;
  onItemClick?: (component: IComponentInstance) => void;
}

const ToolBoxList = ({ list, isForm, onItemClick }: IProps) => {
  return (
    <div className={styles.toolbarList}>
      {list
        ? list.map((component: IComponentManifest<IComponentInstance>) => {
            if (isForm)
              return (
                <ToolBoxForm
                  key={component.componentName}
                  component={component}
                />
              );
            return (
              <ToolBox
                key={component.componentName}
                component={component}
                onClick={onItemClick}
              />
            );
          })
        : ""}
    </div>
  );
};

export default ToolBoxList;
