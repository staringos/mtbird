import { IComponentProps } from "@mtbird/shared";
import React from "react";
import manifest from "./manifest";
import { generateKeys } from "@mtbird/core";
import { message } from "antd";

const VideoComponent = ({ node, style, isEdit }: IComponentProps) => {
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
    if (isEdit) return;
    e.stopPropagation();
    e.preventDefault();
    message.success("点击了视频");
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
      playsInline={true}
      webkit-playsinline={true}
      data-autoplay={props.autoplay}
      onTouchStart={handleClick}
    >
      <source src={props.src as string} type="video/mp4" />
    </video>
  );
};

VideoComponent.manifest = manifest;

export default VideoComponent;
