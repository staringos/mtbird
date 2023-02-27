import { IComponentInstance, IPageConfig } from "@mtbird/shared";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";
import isEmpty from "lodash/isEmpty";
import uniqWith from "lodash/uniqWith";
import AssetsLoader from "./AssetsLoader";
import { getParamFromURL } from "../utils";
import GlobalStorage from "../storage/GlobalStorage";

import { GLOBAL_EXTENSION_COMPONENTS_KEY } from "../constants";

const REGISTRY = process.env.REGISTRY || "https://registry.staringos.com/";

const getRegistry = (extension: any) => {
  const debug = GlobalStorage.debugExtension.split("||");
  if (!isEmpty(debug) && debug) {
    for (let i = 0; i < debug.length; i++) {
      const name = getParamFromURL(debug[i] as string, "name");
      if (name === extension.extensionName) {
        return `${debug[i]?.split("?")[0]}`;
      }
    }
  }
  return `${REGISTRY}${extension.extensionName}/latest`;
};

const getExtensionComponents = (root: IComponentInstance) => {
  const extensionComponents: IComponentInstance[] = [];
  const loop = (component: IComponentInstance) => {
    if (component?.extension?.isExtension) {
      extensionComponents.push(component);
    }

    if (component.children && isArray(component.children)) {
      (component.children as Array<IComponentInstance>).map(
        (cur: IComponentInstance) => loop(cur)
      );
    }

    if (isObject(component.children)) {
      loop(component.children as any);
    }
  };

  loop(root);
  return extensionComponents;
};

const load = async (pageConfig: IPageConfig) => {
  let res = {};
  const extensionComponents: IComponentInstance[] = getExtensionComponents(
    pageConfig.data
  );

  const extensions = uniqWith(
    extensionComponents,
    (first: IComponentInstance, second: IComponentInstance) =>
      first.extension?.extensionName === second.extension?.extensionName
  );

  await Promise.all(
    extensions.map(async (cur: any) => {
      const { extension } = cur;
      const registry = getRegistry(extension);
      const url = `${registry}/components.js`;
      const cssUrl = `${registry}/components.css`;
      const keyPath = `${GLOBAL_EXTENSION_COMPONENTS_KEY}.${
        extension.extensionName as string
      }.components.default`;
      try {
        // load js file, get value from global
        const COMPONENT = await AssetsLoader.js(url, keyPath);
        res[extension.extensionName] = COMPONENT;

        // load css file
        await AssetsLoader.css(cssUrl);
      } catch (e) {}
    })
  );

  // await Promise.all(
  //   extensionComponents.map(async (cur) => {
  //     const { extension } = cur;
  //     const registry = getRegistry(extension);
  //     const url = `${registry}/${extension.componentName}/index.js`;
  //     const cssUrl = `${registry}/${extension.componentName}/index.css`;
  //     const globalKey = (extension.extensionName as string) + extension.componentName;
  //     const keyPath = `${GLOBAL_EXTENSION_COMPONENTS_KEY}.${globalKey}.default`;
  //     try {
  //       // load js file, get value from global
  //       const COMPONENT = await AssetsLoader.js(url, keyPath);
  //       res[globalKey] = COMPONENT;

  //       // load css file
  //       await AssetsLoader.css(cssUrl);
  //     } catch (e) {}
  //   })
  // );
  return res;
};

export default {
  load,
};
