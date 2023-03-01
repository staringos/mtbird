import React from "react";
import {
  IState as IExtensionState,
  IAction as IExtensionAction,
} from "./extension";
import { IState as IPageState, IAction as IPageAction } from "./page";
import { IState as ICommonState, IAction as ICommonAction } from "./common";
import { IEditorOptions } from "@mtbird/shared";

export interface IContextState
  extends IExtensionState,
    IPageState,
    ICommonState {
  loading: boolean;
}
export interface IContextAction
  extends IExtensionAction,
    IPageAction,
    ICommonAction {}

export interface IContext {
  state: IContextState;
  actions: IContextAction;
}

const Model = React.createContext<IContext>({} as any);
export default Model;
