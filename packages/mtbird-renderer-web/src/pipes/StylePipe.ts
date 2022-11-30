import { IPipeProps } from '@mtbird/shared';
import isNumber from 'lodash/isNumber';

/**
 * Adjust styles
 *
 * Like fontSize, does't like width and height, fontSize need unit like `12px` only number 12 does't work
 * @param props
 * @returns
 */
const StylePipe = (props: IPipeProps) => {
  const { containerStyle } = props;

  if (containerStyle && containerStyle.fontSize && isNumber(containerStyle.fontSize)) {
    containerStyle.fontSize = containerStyle.fontSize + 'px';
  }
  return props;
};

export default StylePipe;
