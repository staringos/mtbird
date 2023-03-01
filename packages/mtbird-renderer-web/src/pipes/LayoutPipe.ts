import { IPipeProps } from "@mtbird/shared";
import { LAYOUT_TYPE, COMPONENT_NAME } from "@mtbird/core";

const LAYOUT_STYLES = {
  absolute: {
    position: "absolute",
    display: "block",
  },
  flex: {
    display: "flex",
  },
  grid: {
    display: "grid",
  },
};

/**
 * change layout className and style
 * @param props
 * @returns
 */
const LayoutPipe = (props: IPipeProps) => {
  const { node, dataSource, wrapperProps } = props;

  // class name
  switch (node.layout) {
    case LAYOUT_TYPE.FLEX:
      wrapperProps.className = "mtbird-flex-component";
      break;
    case LAYOUT_TYPE.GRID:
      wrapperProps.className = "mtbird-grid-component";
      break;
    case LAYOUT_TYPE.ABSOLUTE:
    default:
      wrapperProps.className = "mtbird-component";
      break;
  }

  // if (node.componentName !== COMPONENT_NAME.CONTAINER_BLOCK && node.componentName !== COMPONENT_NAME.CONTAINER_ROOT) {
  if (node.componentName !== COMPONENT_NAME.CONTAINER_ROOT) {
    wrapperProps.className =
      wrapperProps.className + " mtbird-selectable-component";
  }

  return { ...props, node, dataSource };
};

export default LayoutPipe;
