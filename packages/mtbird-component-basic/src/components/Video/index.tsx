import { IComponentProps } from "@mtbird/shared/src/types/Component";
import React from "react";
import manifest from "./manifest";
import { generateKeys } from "@mtbird/core";

const VideoComponent = ({ node, style }: IComponentProps) => {
  const { props } = node;
  const id = generateKeys();
  const addProps = {
    ...props,
  };

  if (addProps.autoplay) {
    addProps["x5-video-player-fullscreen"] = false;
    addProps["x5-video-orientation"] = "portraint";
  }

  const handleClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const video = document.getElementById(id) as HTMLVideoElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <video
      {...props}
      id={id}
      style={style}
      width={props.style.width}
      height={props.style.height}
      playsinline="true"
      webkit-playsinline="true"
      onTouchStart={handleClick}
    >
      <source src={props.src as string} type="video/mp4" />
    </video>
  );
};

VideoComponent.manifest = manifest;

export default VideoComponent;
