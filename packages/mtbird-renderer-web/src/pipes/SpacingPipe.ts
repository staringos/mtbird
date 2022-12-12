import { IPipeProps } from '@mtbird/shared';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';

/**
 * If parent has spacing, set child marginLeft and marginTop same with spacing
 * @param props
 * @returns
 */
const SpacingPipe = (props: IPipeProps) => {
  const { node, parent, wrapperProps, containerStyle } = props;

  // if current node has spacing
  const currentSpacing = get(node, 'pattern.spacing');
  if (isNumber(currentSpacing)) {
    containerStyle.marginLeft = -currentSpacing;
    containerStyle.marginTop = -currentSpacing;
    delete containerStyle.width;
  }

  // if parent has spacing
  const spacing = get(parent, 'pattern.spacing');

  if (isNaN(spacing)) return props;

  wrapperProps.style.marginLeft = spacing;
  wrapperProps.style.marginTop = spacing;

  return { ...props, node };
};

export default SpacingPipe;
