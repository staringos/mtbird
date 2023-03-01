import React, { useContext } from "react";
import style from "./style.module.less";
import { Shape, utils } from "@mtbird/component-basic";
import Model from "../../store/types";

const ShapePanel = () => {
  const { actions } = useContext(Model);
  const handleAddShape = (shape: any) => {
    const node = utils.generateShape(shape, 58);
    actions.setEditMode(node);
    // actions.addComponent(node);
  };

  return (
    <div className={style.shapePanelContaienr}>
      {utils.SHAPE_LIST.map(
        (cur: { type: string; children: any[] }, i: number) => {
          return (
            <div className={style.shapePanelRow} key={i}>
              <div className={style.shapePanelTitle}>{cur.type}</div>
              <div className={style.shapePanelContent}>
                {cur.children.map((shape: any, j: number) => {
                  const node = utils.generateShape(shape, 28);
                  return (
                    <div
                      className={style.shape}
                      onClick={() => handleAddShape(shape)}
                      key={j}
                    >
                      <Shape node={node} style={node.props?.style} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ShapePanel;
