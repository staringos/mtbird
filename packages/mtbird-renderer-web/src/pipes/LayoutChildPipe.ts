import { IPipeProps } from '@mtbird/shared';
import { LAYOUT_TYPE, COMPONENT_NAME } from '@mtbird/core';
import set from 'lodash/set';

/**
 * If parent.layout is flex, then positon: relative and flex: 1;
 * @param props
 * @returns
 */
const LayoutChildPipe = (props: IPipeProps) => {
  const { node, dataSource, parent, wrapperProps } = props;

  if (parent && parent.layout === LAYOUT_TYPE.FLEX && node.componentName !== COMPONENT_NAME.MODAL) {
    set(wrapperProps, 'style.position', 'relative');
    wrapperProps.style.zIndex = 'unset';
    node.props.className = 'relative';
  }

  return { ...props, node, dataSource };
};

export default LayoutChildPipe;
