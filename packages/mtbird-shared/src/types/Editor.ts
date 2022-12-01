import { IExtensionImportType } from './Extension';
import { IPageConfig } from './Page';
import { IComponentInstance } from './Component';
import { IModel } from './Data';
import { IDataSource } from './DataSource';

export interface IEditorSettings {
  platform: 'mobile' | 'pc';
  mobileType?: string;
  screenWidth?: number;
  screenHeight?: number;
  pageType?: string;
  defaultToolbar?: string;
}

export interface IUser {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
}

export interface IEditorOptions {
  debug?: string | null;
  pageConfig: IPageConfig;
  pageList?: IPageConfig[];
  extensions?: IExtensionImportType[];
  editorSettings?: IEditorSettings;
  onlineUserList?: IUser[];
  models?: IModel[];
  modelDataSource?: IDataSource;
  onBack: () => void;
  onUpload: (files: any) => Promise<string[]>;
  onSave: (page: IPageConfig, avatar: string) => void;
  onPageChange: (id: string) => void;
  onPreview?: () => void;
  onPublish?: () => void;
  onHistoryChange?: (historyId: string) => void;
  onSaveTemplate: (content: IComponentInstance, avatarUrl: string) => void;
}
