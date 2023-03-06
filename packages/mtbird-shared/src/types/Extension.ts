import {
  IComponentCommon,
  IComponentInstance,
  IComponentInstanceForm,
  IComponentManifest,
} from "./Component";
import { IUser } from "./Editor";
import { IPageConfig } from "./Page";

export type ContributesTypes = "toolbars" | "headers" | "schemas";

export interface IContribute {
  sort: number;
  params: Record<string, any>;
  link: "feature" | "modal" | "link" | "default";
  href?: string;
  feature?: string;
}

export type IExtensionImportType =
  | string
  | {
      activateFn: (context: IExtensionContext) => void;
      manifest: IExtensionManifest;
    };

export type ContributeMap = Record<ContributesTypes, IContribute>;

export interface IRequestParams {
  data?: Record<PropertyKey, any>;
  params?: Record<PropertyKey, any>;
  headers?: Record<PropertyKey, any>;
}

export interface IRequest {
  get: (url: string, options?: IRequestParams) => Promise<any>;
  post: (url: string, data?: any, options?: IRequestParams) => Promise<any>;
  put: (url: string, data?: any, options?: IRequestParams) => Promise<any>;
  delete: (url: string, options?: IRequestParams) => Promise<any>;
}

export interface IRouter {
  refresh: () => void;
}

export interface IEventEmitter {
  emit: (key: Symbol, ...params: any) => void;
  on: (event: Symbol, listener: (...params: any) => void) => void;
  off: (event: Symbol, listener: (...params: any) => void) => void;
}

export interface IExtensionContext {
  page: IPageConfig | null;
  pageList: IPageConfig[];
  componentMap: Map<string, IComponentInstance | IComponentInstanceForm>;
  currentComponent: IComponentInstance[];
  request: IRequest;
  storage: Storage;
  router: IRouter;
  variables: Record<string, any>;
  currentDataContainer?: IComponentInstance;
  componentLibs: IComponentLibs;
  onlineUserList: IUser[];

  // event emit and subscription hub
  eventHub: IEventEmitter;
  EVENT_KEYS: Record<string, Symbol>;

  /**
   * 上传图片
   * @param images
   * @returns
   */
  onUpload: (images: []) => Promise<string[]>;

  /**
   * 编辑器所有已注册的组件
   */
  registeredComponents?: Record<string, IComponentCommon>;

  /**
   * 注册feature
   */
  registerFeature: (key: string, feature: any) => void;
  /**
   * 注册弹窗
   */
  registerModal: (key: string, modal: any) => void;
  /**
   * 添加组件
   */
  addComponent: (component: IComponentInstance) => void;
  /**
   * 删除组件
   */
  deleteComponent: () => void;
  /**
   * 复制组件
   */
  copyComponent: () => void;
  /**
   * 移动组件
   */
  moveComponent: (leftOffset: number, topOffset: number) => void;
  /**
   * 上移一层
   */
  goUpper: () => void;
  /**
   * 下移一层
   */
  goLower: () => void;

  /**
   * 选中组件
   */
  selectComponent: (component: Array<IComponentInstance>) => void;

  /**
   * modify currentComponent config
   */
  onChangeValue: (keyPath: string, value: any, id?: string) => void;

  /**
   * Replace root component
   */
  onChangeRoot: (newRoot: IComponentInstance | IComponentInstanceForm) => void;

  /**
   * Change childId's component's parent to parentId component
   */
  onChangeParent: (childId: string, newParentId: string) => void;

  /**
   * Inject render pipe handler and configuration into currentComponent's pipes.render attribute
   */
  injectRenderPipe: (extensionName: string, pipeName: string) => void;

  /**
   * Remove render pipe handler and configuration from currentComponent's pipes.render attribute
   */
  removeRenderPipe: (extensionName: string, pipeName: string) => void;
}

export interface IExtensionManifest {
  id: string;
  name: string;
  version: string;
  pipes: string[];
  contributes: ContributeMap;
  components: string[] | boolean;
  componentLibs: IComponentLibs[];
}

export interface IComponentLibs {
  key: string;
  title: string;
  desc?: string;
  headImage?: string;
}

export interface IExtension {
  activityFn: (context: IExtensionContext) => void;
  manifest: IExtensionManifest;
}

export interface IExtensionDTO {
  id: string;
  title: string;
  name: string;
  latestVersion: string;
  desc: string;
  hasInstalled: boolean;
  avatar?: string;
  isPreInstalled?: boolean;
  isOfficial?: boolean;
}

export interface IPipe {
  handler: string;
  name: string;
  extensionName?: string;
}

export interface IExtensionComponent {
  componentName: string;
  extensionName: string;
  version: string;
  manifest: IComponentManifest<IComponentInstance>;
}

export type PipeStage = "init" | "render" | "rendered" | "beforeDestroy";

export interface IExtensionFeatureProps {
  context: IExtensionContext;
}
