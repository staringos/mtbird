import { IPipeProps } from "@mtbird/shared";
import { COMPONENT_NAME } from "../../../mtbird-core/src/constants";

/**
 * Adjust styles
 *
 * Like fontSize, does't like width and height, fontSize need unit like `12px` only number 12 does't work
 * @param props
 * @returns
 */
const ModalPipe = (props: IPipeProps) => {
  const { node, wrapperProps } = props;
  if (node?.componentName === COMPONENT_NAME.MODAL) {
    wrapperProps.style.zIndex = 999;
  }
  return props;
};

export default ModalPipe;
