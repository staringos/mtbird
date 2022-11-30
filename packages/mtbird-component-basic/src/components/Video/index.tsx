import { IComponentProps } from '@mtbird/shared/src/types/Component';
import React from 'react';
import manifest from './manifest';

const VideoComponent = ({ node, style }: IComponentProps) => {
  const { props } = node;
  return (
    <video {...props} style={style} width={props.style.width} height={props.style.height}>
      <source src={props.src as string} type="video/mp4" />
    </video>
  );
};

VideoComponent.manifest = manifest;

export default VideoComponent;
