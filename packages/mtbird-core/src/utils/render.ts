import isNumber from 'lodash/isNumber';

export function wrapStyle(style: any) {
  const resStyle = {
    ...style
  };
  if (resStyle.fontSize && isNumber(resStyle.fontSize)) {
    resStyle.fontSize = resStyle.fontSize + 'px';
  }

  return resStyle;
}
