import { IComponentProps } from "@mtbird/shared/src/types/Component";
import React from "react";
import manifest from "./manifest";

const VideoComponent = ({ node, style }: IComponentProps) => {
  const { props } = node;
  const addProps = {
    ...props,
  };

  if (addProps.autoplay) {
    addProps["x5-video-player-fullscreen"] = false;
    addProps["x5-video-orientation"] = "portraint";
  }

  return (
    <video
      {...props}
      style={style}
      width={props.style.width}
      height={props.style.height}
      playsinline="true"
      webkit-playsinline="true"
    >
      <source src={props.src as string} type="video/mp4" />
    </video>
  );
};

VideoComponent.manifest = manifest;

export default VideoComponent;
