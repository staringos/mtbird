import type { IComponentInstance, IPageConfig, IDataSource, IPosition } from '@mtbird/shared';
import { RefObject } from 'react';
import Moveable from 'react-moveable';

export interface ISaveState {
  state: 'SAVED' | 'SAVING';
  lastSaveTime?: Date;
}

export interface IState {
  componentMap: Map<string, IComponentInstance>;
  pageConfig: IPageConfig;
  currentComponent: IComponentInstance[];
  schemaDataSource: IDataSource;
  pageDataSource: IDataSource;
  pageList: IPageConfig[];
  moveableRef: RefObject<Moveable | undefined>;
  saveState: ISaveState;
}

export interface IAction {
  setCurrentComponent: (currentComponent: IComponentInstance[]) => void;
  onSave: () => void;
  onChange: (keyPath: string, value: any, componentId?: string) => void;
  // batch change many component
  // record: Map<componentId, Record<keyPath, value>>
  onBatchChange: (record: Map<string, Record<string, any>>) => void;
  onSelect: (component: IComponentInstance) => void;
  // for example, hold shift key to select, continue select
  onSelectContinue: (component: IComponentInstance | Array<IComponentInstance>) => void;
  // add a container compoennt outside components
  group: (components: Array<IComponentInstance>) => void;
  // param is component type container, remove this container, and add all his children into his parent
  ungroup: (component: IComponentInstance) => void;
  // add component with position
  addComponentWithPos: (pos: IPosition, component: IComponentInstance, parentComponentId?: string) => void;
  // if not parentComponentId, it means add this component to currentComponents
  addComponent: (component: IComponentInstance, parentComponentId?: string) => void;
  deleteComponent: () => void;
  publishPage: () => void;
  goUpper: () => void;
  goLower: () => void;
  goTop: () => void;
  goBottom: () => void;
  copyComponent: () => void;
  moveComponent: (leftOffset: number, topOffset: number) => void;
  getMoveable: () => Moveable | undefined;
  prevStep: () => void;
  nextStep: () => void;
}

export interface IContext {
  state: IState;
  actions: IAction;
}

export default IContext;
