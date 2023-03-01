import React, { useContext, useEffect } from "react";
import ExtensionContext from "./ExtensionContext";
import Sandbox from "./Sandbox";
import { ISandBox } from "./types";

interface IProps {
  featureKey: string;
  extensionName?: string;
  store: any;
}

const SANDBOXS = new Map<PropertyKey, ISandBox>();

const ExtensionRender = (props: IProps) => {
  const { store } = props;
  let { extensionName, featureKey } = props;

  if (!featureKey) return <div>need featureKey</div>;
  if (!extensionName) {
    extensionName = featureKey.split(".")[0];
  }

  // 1. create extension context
  const context = new ExtensionContext(store, extensionName as string);
  const FEATURES = store.state.extensionFeatures?.get(featureKey) as any;

  if (!FEATURES) {
    return <span>component not find</span>;
  }

  // 2. new or get sandbox
  // let sandbox = SANDBOXS.get(extensionName);

  // if (!sandbox) {
  //   const newSandbox = new Sandbox(extensionName);
  //   SANDBOXS.set(extensionName, newSandbox);
  //   sandbox = newSandbox;
  // }

  // 3. sand box bind with effect
  // useEffect(() => {
  //   if (!sandbox) return;
  //   sandbox.active();

  //   return () => {
  //     sandbox?.inactive();
  //   };
  // }, []);

  // 4. render component
  return <FEATURES context={context} />;
};

export default ExtensionRender;
