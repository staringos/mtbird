import { IContext } from "packages/mtbird-editor/src/models";
import {
  IComponentInstanceCommon,
  IExtensionContext,
  IExtensionManifest,
} from "@mtbird/shared";
import { Component, FC } from "react";
import isArray from "lodash/isArray";
import get from "lodash/get";
import set from "lodash/set";

import { IComponentInstance } from "@mtbird/shared";
import RequestFactory from "./request";
import StorageFactory from "./storage";
import { Events, EVENT_KEYS } from "@mtbird/core";

/**
 * Extension Context
 * With global context data and utilities, For operation auth control, limited store access and those tools extension required only
 */
export default class ExtensionContext implements IExtensionContext {
  constructor(
    store: IContext,
    extensionName: string,
    manifest?: IExtensionManifest
  ) {
    this.store = store;
    this.manifest = manifest;
    this.extensionName = extensionName;
  }

  get page() {
    return this.store?.state?.pageConfig || null;
  }

  get currentComponent() {
    return this.store?.state?.currentComponent || null;
  }

  get registeredComponents() {
    return this.store?.state.registeredComponents || {};
  }

  get componentMap() {
    return this.store?.state.componentMap || new Map();
  }

  get pageList() {
    return this.store?.state.pageList || [];
  }

  get variables() {
    return this.store?.state.variables || {};
  }

  get currentDataContainer() {
    return this.store?.state.currentDataContainer;
  }

  get componentLibs() {
    return this.store?.state.componentLibs;
  }

  get onUpload() {
    return this.store?.actions.onUpload;
  }

  extensionName = "";

  private store: IContext | null = null;
  private manifest: IExtensionManifest | undefined = undefined;

  /**
   * Http Request
   */
  public request = RequestFactory();

  /**
   * Storage
   */
  public storage = StorageFactory(localStorage);

  /**
   * router
   */
  public router = {
    refresh: () => location.reload(),
  };

  public eventHub = Events;
  // some event may not open to extension developer
  public EVENT_KEYS = {
    TEMPLATE_ADDED: EVENT_KEYS.TEMPLATE_ADDED,
    TOOLBAR_SWITCH: EVENT_KEYS.TOOLBAR_SWITCH,
    SELECT_COMPONENT: EVENT_KEYS.SELECT_COMPONENT,
  };

  /**
   * Register component
   * @param key
   * @param component
   */
  public registerFeature = (key: string, feature: FC | Component) => {
    this.store?.actions?.registerFeature(
      `${this.extensionName}.${key}`,
      feature
    );
  };

  public registerModal = (key: string, component: FC | Component) => {
    this.store?.actions?.registerModal(
      `${this.extensionName}.${key}`,
      component
    );
  };

  /**
   * Add component to current select component
   * if current select component isn't `container`
   * then use its upper nearest `container`
   * @param component
   */
  public addComponent = (component: IComponentInstance) => {
    this.store.actions.addComponent(component);
  };

  /**
   * Delete current components
   */
  public deleteComponent = () => {
    this.store.actions.deleteComponent();
  };

  /**
   * Copy current components
   */
  public copyComponent = () => {
    this.store.actions.copyComponent();
  };

  public moveComponent = (leftOffset: number, topOffset: number) => {
    this.store.actions.moveComponent(leftOffset, topOffset);
  };

  public selectComponent = (component: Array<IComponentInstance>) => {
    this.store.actions.onSelect(component);
  };

  public goUpper = () => {
    this.store.actions.goUpper();
  };

  public goLower = () => {
    this.store.actions.goLower();
  };

  // change component, if id not set, change all currentComponent
  public onChangeValue = (keyPath: string, value: any, id?: string) => {
    this.store.actions.onChange(keyPath, value, id);
  };

  // refresh data model
  public refreshDataModel = () => {
    return this.store.state.options.refreshDataModel?.();
  };

  // Replace root component
  public onChangeRoot = (newRoot: IComponentInstanceCommon) => {
    this.store.actions.onChangeRoot(newRoot);
  };

  public onChangeParent = (childId: string, parentId: string) => {
    this.store.actions.onChangeParent(childId, parentId);
  };

  public injectRenderPipe = (extensionName: string, pipeName: string) => {
    const { extensionPipes } = this.store.state;
    this.store.actions.onChange(`pipes.render.${extensionName}-${pipeName}`, {
      name: pipeName,
      handler: extensionPipes.get(`${extensionName}-${pipeName}`).handler,
      extensionName,
    });
  };

  public removeRenderPipe = (extensionName: string, pipeName: string) => {
    const { actions } = this.store;
    const currentComponent = isArray(this.currentComponent)
      ? this.currentComponent
      : [this.currentComponent];
    currentComponent.map((cur: IComponentInstance) => {
      const renderPipes = get(cur, "pipes.render");
      const key = `${extensionName}-${pipeName}`;
      if (!renderPipes || !renderPipes[key]) return;

      delete renderPipes[key];
      set(cur, "pipes.render", renderPipes);
    });

    actions.setCurrentComponent(currentComponent);
  };
}
