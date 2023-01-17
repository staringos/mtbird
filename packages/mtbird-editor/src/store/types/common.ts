import type { IEditorOptions, IComponentInstance, IEditorSettings, IUser } from '@mtbird/shared';

export type EditMode = IComponentInstance | { componentName: string };

export interface IState {
  options: IEditorOptions;
  onlineUserList?: IUser[];
  variables: Record<string, any>;
  editMode: EditMode;
  tabsState: Record<string, boolean>;
  tourState: boolean;
}

export interface IAction {
  onUpload: (files: any) => Promise<string[]>;
  onSaveTemplate: (component: IComponentInstance, avatarUrl: string) => void;
  setEditorSettings: (settings: IEditorSettings) => void;
  toggleRenderModal: (id: string, e: boolean) => void;
  getCurrentModal: () => string | null;
  setEditMode: (mode: EditMode) => void;
  toggleTab: (tabKey: string) => void;
  toggleTour: () => void;
}

export interface IContext {
  state: IState;
  actions: IAction;
}

export default IContext;
