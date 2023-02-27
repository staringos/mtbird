"use client";
import React, { useEffect, useState } from "react";
import Editor from "@mtbird/editor";
import { Spin } from "antd";
import "@mtbird/editor/dist/index.css";
import { DATA } from "@/utils/constants";
import useSSR from "@/hooks/useSSR";

const EditorComponent = () => {
  const isSSR = useSSR();

  const args = {
    options: {
      pageConfig: DATA,
      extensions: ["mtbird-extension-enterprise", "mtbird-extension-animation"],
      onPreview: () => {
        window.open(`/preview`);
      },
      onBack: () => {
        location.href = "https://mtbird.staringos.com";
      },
    },
  };

  if (isSSR) return <Spin />;

  return <Editor {...args} />;
};

export default EditorComponent;
