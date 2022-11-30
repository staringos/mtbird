import React from 'react';
import manifest from './manifest';
import { IComponentProps } from '@mtbird/shared/src/types/Component';

const IconComponent = ({ node, style }: IComponentProps) => {
  const { props } = node;
  const innerStyle = { ...style };
  if (props?.style?.width) {
    innerStyle.fontSize = props?.style?.width;
  }

  innerStyle.color = '#08c';
  return <i {...props} style={innerStyle} />;
};

IconComponent.manifest = manifest;

export default IconComponent;
