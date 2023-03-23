import React from "react";
import jsxRuntime from "react/jsx-runtime";
import "antd/dist/reset.css";
import "@/styles/globals.css";
import * as core from "@mtbird/core";
import type { AppProps } from "next/app";
import "@mtbird/ui/dist/index.css";

if (process.browser) {
  (window as any)["react"] = React;
  (window as any)["jsxRuntime"] = jsxRuntime;
  (window as any)["react/jsxRuntime"] = jsxRuntime;
  (window as any)["core"] = core;
} else {
  (global as any)["react"] = React;
  (global as any)["jsxRuntime"] = jsxRuntime;
  (global as any)["react/jsxRuntime"] = jsxRuntime;
  (global as any)["core"] = core;
}
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
