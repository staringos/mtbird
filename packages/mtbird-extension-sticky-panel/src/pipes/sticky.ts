import { IStickyComponentInstance } from '../definitions';
import { IPipeProps } from '@mtbird/shared';

interface IProps extends IPipeProps {
  node: IStickyComponentInstance;
  isEdit: boolean;
}

export default (params: IProps) => {
  const { node, wrapperProps, isEdit } = params;
  const { sticky } = node.pattern || {};

  // disable in editor
  if (!sticky || !sticky.open || isEdit) return params;

  wrapperProps.style.position = 'fixed';

  if (sticky.position === 'top') {
    wrapperProps.style.top = sticky.verticalMargin;
  } else {
    wrapperProps.style.bottom = sticky.verticalMargin;
  }

  if (sticky.position === 'right') {
    wrapperProps.style.right = sticky.horizontalMargin;
  } else {
    wrapperProps.style.left = sticky.horizontalMargin;
  }

  wrapperProps.style.zIndex = 999;

  if (!wrapperProps.style.width) {
    wrapperProps.style.width = '100%';
  }

  return params;
};
