// import axios from 'axios';
import React from "react";
import jsxRuntime from "react/jsx-runtime";
import ReactDOM from "react-dom";
import type {
  IExtensionImportType,
  IContribute,
  IPipe,
  IExtensionComponent,
  IComponentInstance,
} from "@mtbird/shared";
import {
  AssetsLoader,
  GLOBAL_EXTENSION_COMPONENTS_KEY,
  GLOBAL_EXTENSION_KEY,
  pipelineAsync,
  GlobalStorage,
} from "@mtbird/core";
import {
  ContributesTypes,
  IComponentLibs,
  IExtensionManifest,
} from "../../mtbird-shared/src/types/Extension";
import keys from "lodash/keys";
import * as antd from "antd";
import cloneDeep from "lodash/cloneDeep";
import isArray from "lodash/isArray";

const basicUrl = "https://registry.staringos.com";

if (typeof window !== "undefined") {
  if (!window[GLOBAL_EXTENSION_KEY]) {
    window[GLOBAL_EXTENSION_KEY] = {};
    window["react"] = React;
    window["jsxRuntime"] = jsxRuntime;
    window["react-dom"] = ReactDOM;
  }

  if (!window["antd"]) {
    window["antd"] = antd;
  }
}

interface ILinks {
  base: string;
  js: string;
  manifest: string;
  style: string;
}

interface IExtensionParams {
  key: string;
  contributes: Map<ContributesTypes, IContribute[]>;
  pipes: Map<string, IPipe>;
  urls: ILinks;
  manifest?: IExtensionManifest;
  components: Map<string, IExtensionComponent>;
  constributes?: IContribute;
  activityFn: any;
  isDev: boolean;
  componentLibs: IComponentLibs[];
}

export const getExtensionFeatureUrl = (
  params: IExtensionParams
): IExtensionParams => {
  const [plugin, version] = params.key.split("@");
  const pluginLink =
    plugin.startsWith("https://") || plugin.startsWith("http://")
      ? plugin
      : `${basicUrl}/${plugin}/${version || "latest"}`;
  const [link, urlParams] = pluginLink.split("?");
  const date = new Date().valueOf();

  const urls = {
    base: link,
    js: `${link}/index.umd.js`,
    manifest: `${link}/manifest.json?${params.isDev ? `id=${date}` : ""}`,
    style: `${link}/index.css`,
  };
  return {
    ...params,
    urls,
  };
};

/**
 * Load js by append a new <script /> element
 * Bind loaded event to wait unit loaded as promise resolve
 * @param params
 * @returns
 */
const loadJS = async (params: IExtensionParams) => {
  const { manifest, urls } = params;
  const COMPONENT = await AssetsLoader.js(
    urls.js,
    `${GLOBAL_EXTENSION_KEY}.${manifest?.name}.default`,
    !params.isDev,
    params.isDev
  );

  return {
    ...params,
    activityFn: COMPONENT,
  };
};

/**
 * Load plugin css file by create new <link type="text/css" />
 * @param params
 * @returns
 */
const loadCSS = async (params: IExtensionParams) => {
  if (!params) return params;
  try {
    await AssetsLoader.css(params.urls.style, !params.isDev, params.isDev);
  } catch (e) {
  } finally {
    return params;
  }
};

const loadManifest = async (
  extensionParams: IExtensionParams
): Promise<IExtensionParams> => {
  try {
    const res: IExtensionManifest = await fetch(
      extensionParams.urls.manifest
    ).then(async (response) => {
      return await response.json();
    });
    return {
      ...extensionParams,
      manifest: res,
    };
  } catch (e) {
    return {
      ...extensionParams,
      manifest: {} as any,
    };
  }
};

/**
 * Load pipes declare in extension manifest.json
 * @returns
 */
const loadPipes = async (extensionParams: IExtensionParams) => {
  const { manifest, isDev } = extensionParams;
  try {
    if (!manifest || !manifest.pipes || manifest.pipes.length === 0) {
      return {
        ...extensionParams,
        pipes: {} as any,
      };
    }

    const pipes = {};
    manifest.pipes.map(async (pipeName) => {
      const res: string = await fetch(
        `${extensionParams.urls.base}/pipe-${pipeName}.js?t=` +
          (isDev ? new Date().getTime() : "")
      ).then(async (response) => {
        return await response.text();
      });

      const key = `${manifest.name}-${pipeName}`;

      pipes[key] = {
        name: pipeName,
        extensionName: manifest.name,
        handler: res,
      };

      extensionParams.pipes.set(key, pipes[key]);
    });
    return {
      ...extensionParams,
      pipes,
    };
  } catch (e) {
    return {
      ...extensionParams,
      pipes: {} as any,
    };
  }
};

/**
 * Load contributes from manifest.json
 * @param params
 * @returns
 */
const loadContributes = async (params: IExtensionParams) => {
  if (!params.manifest) return params;
  const { contributes } = params.manifest;
  const contributeTypes = keys(contributes);

  contributeTypes.map((key: ContributesTypes) => {
    const crt = contributes[key] as any;
    crt.map((cur: IContribute) => {
      if (cur.feature) {
        cur.feature = params.manifest?.name + "." + cur.feature;
      }
    });
    params.contributes.set(
      key,
      (params.contributes.get(key) || []).concat(crt) || []
    );
  });

  return params;
};

/**
 * Load components from manifest.json
 * @param params
 * @returns
 */
const loadComponents = async (params: IExtensionParams) => {
  const { manifest, urls, isDev } = params;
  if (!manifest) return params;
  if (!manifest.components || manifest.components.length === 0) return params;

  const { components } = manifest;

  if (components) {
    const url = `${urls.base}/components.js`;
    const globalKey = manifest?.name as string;
    const keyPath = `${GLOBAL_EXTENSION_COMPONENTS_KEY}.${globalKey}.components.default`;
    const COMPONENT = await AssetsLoader.js(url, keyPath, !isDev, isDev);

    keys(COMPONENT).map((key: string) => {
      const componentKey = globalKey + key;
      const curComponent = COMPONENT[key];

      const instanceExtension = {
        isExtension: true,
        extensionName: manifest.name,
        componentName: key,
        version: manifest.version,
      };

      const instance = cloneDeep(curComponent.manifest?.instance);

      // set instance component name to extension name + component name
      const loop = (cmpt: IComponentInstance) => {
        if (cmpt.componentName === key) {
          cmpt.componentName = componentKey;
          cmpt.extension = instanceExtension;
        }

        if (cmpt.children && isArray(cmpt.children)) {
          (cmpt.children as IComponentInstance[]).forEach(
            (n: IComponentInstance) => loop(n)
          );
        }
      };

      loop(instance);

      const componentManifest = {
        ...curComponent.manifest,
        componentName: componentKey,
        extension: {
          ...instanceExtension,
          component: curComponent,
        },
        instance: instance,
      };

      return params.components.set(componentKey, componentManifest);
    });
  }

  return params;
};

/**
 * Load plugin css file by create new <link type="text/css" />
 * @param params
 * @returns
 */
const loadComponentCSS = async (params: IExtensionParams) => {
  if (!params) return params;
  const { urls, manifest, isDev } = params;
  if (!manifest || !manifest.components) return params;

  const { components } = manifest;

  try {
    if (components) {
      const url = `${urls.base}/components.css`;
      await AssetsLoader.css(url, !isDev, isDev);
    }
  } catch (e) {
  } finally {
    return params;
  }
};

const loadComponentLibs = async (params: IExtensionParams) => {
  if (!params || !params.manifest?.componentLibs) return params;
  params.manifest?.componentLibs.map((cur) => {
    params.componentLibs.push(cur);
  });
  return params;
};

/**
 * Append extensions type
 *
 * 1. extension name: key@version (example: extension-image-library@latest)
 * 2. basic url link: https://registry.staringos.com/extensions/extension-image-library/latest
 *
 * TODO:
 * 3. import npm package: @mtbird/extension-image-library
 * 4. import extension object: {activityFn, manifest}
 *
 * @param extensions
 */
const extensionLoader = async (extensions: IExtensionImportType[]) => {
  const contributes = new Map<ContributesTypes, IContribute[]>();
  const pipes = new Map<string, IPipe>();
  const components = new Map<string, IExtensionComponent>();
  const componentLibs = [] as IComponentLibs[];

  const promiseLoads = extensions.map(async (cur) => {
    try {
      return await pipelineAsync([
        getExtensionFeatureUrl,
        loadManifest,
        loadContributes,
        loadJS,
        loadCSS,
        loadPipes,
        loadComponents,
        loadComponentCSS,
        loadComponentLibs,
      ])({
        key: cur,
        pipes,
        contributes,
        components,
        componentLibs,
        isDev: GlobalStorage.debugExtension === cur,
      });
    } catch (e) {
      console.error("[MtBird ERROR] Extension (" + cur + ") loaded failed", e);
      // loaded failed pass
    }
  });
  const extensionParams = await Promise.all(promiseLoads).catch((e) => {});
  return {
    extensionParams,
    pipes,
    contributes,
    components,
    componentLibs,
  };
};

export default extensionLoader;
