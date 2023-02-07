import { Component, FC } from 'react';
import type {
  IExtensionImportType,
  IPipe,
  IExtensionComponent,
  IComponentManifest,
  IComponentInstance,
  IComponentInstanceForm,
  IContribute,
  IComponentLibs
} from '@mtbird/shared';
import { ContributesKeys, IContributeManifest } from '@mtbird/helper-extension';

export interface IState {
  extensions: IExtensionImportType[];
  extensionComponents?: Map<string, IExtensionComponent> | null;
  extensionFeatures?: Map<string, Component | FC> | null;
  extensionModalVisible?: Map<string, IContribute>;
  extensionContributes: Map<ContributesKeys, IContributeManifest[]>;
  extensionLoadStatus: string;
  extensionPipes: Map<string, IPipe>;
  extensionPanelVisible: Map<string, IContribute>;
  registeredComponents: Record<string, IComponentManifest<IComponentInstance | IComponentInstanceForm>>;
  componentLibs: IComponentLibs[];
}

export interface IAction {
  init: (context: IContext) => Promise<void>;
  appendContributes: (type: string, contributes: IContribute) => void;
  registerFeature: (key: string, feature: any) => void;
  toggleModal: (key: string, params: any) => void;
  togglePanel: (key: string, params: any) => void;
}

export interface IContext {
  state: IState;
  actions: IAction;
}

export default IContext;
