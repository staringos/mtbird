import { MoveableManagerInterface, Renderer } from "react-moveable";
import styles from "./style.module.less";

const DimensionViewable = {
  name: "dimensionViewable",
  props: {},
  events: {},
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
    const rect = moveable.getRect();

    // Add key (required)
    // Add class prefix moveable-(required)
    return (
      <div
        key={"dimension-viewer"}
        className={styles.dimensionViewable}
        style={{
          left: `${rect.width / 2}px`,
          top: `${rect.height + 10}px`,
        }}
      >
        {Math.round(rect.offsetWidth)} x {Math.round(rect.offsetHeight)}
      </div>
    );
  },
} as const;

export default DimensionViewable;
