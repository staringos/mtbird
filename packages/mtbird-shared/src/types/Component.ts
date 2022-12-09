// import React from 'react';
import { IEntity } from './Common';
import { DataType } from './Data';
import type { IDataSource } from './DataSource';
import { IPipe } from './Extension';

/**
 * The props of component which will directly send to React DOM
 */
export interface IProps {
  style: any; // React.CSSProperties;
  [name: string]: unknown;
}

export interface IVariable {
  name?: string;
  dataType: DataType;
  key: any;
  value: any;

  // variable init value from
  sourceType: 'api' | 'dataModels' | 'defaultValue' | 'pageParams';

  dataModelsId?: string;
  apiId?: string;
  defaultValue?: string | number;
}

export type EventAction = 'click' | 'hover' | 'blur' | 'dbclick' | 'scroll';
export type EventType = 'link' | 'link-blank' | 'submit' | 'clear' | 'open-modal' | 'close-modal' | 'inline-code' | 'change-variable';

export interface IEvent {
  action?: EventAction;
  name?: string;
  type: EventType;
  src?: string;
  inlineCode?: string;
  modalId: string;
  keyPath?: string; // when event type is change-variable, key path to varibles
  value?: string | number | boolean; // when event is change-variable, set keyPath from varibles to this value
  pageId?: string; // when event type is page
}

export interface IAnimate {
  type: string;
  className: string;
  delay: number;
  duration: number;
  repeat: number;
  infinite: boolean;
  open: boolean;
}

export interface ISearch {
  // keyPath or field id
  keyPath: string;
  display: string;
  operator: 'equals' | 'not-equals';
  default: boolean;
  value: string;
}

export interface IColumn {
  title: string;
  dataIndex: string;
  render?: 'date' | string;
}

export interface IFeatures {
  pagination: { pageNum: number; pageSize: number } | boolean;
  modify: boolean;
  delete: boolean;
  add: boolean;
  search: ISearch[] | boolean;
  additionColumns: IColumn[];
  sorts: string[] | boolean;
}

export interface IComponentInstance {
  id?: string;
  type: string;
  componentName: string;
  props: IProps;
  layout?: 'absolute' | 'grid' | 'flex';
  data?: {
    title?: string;
    alias?: string; // 组件自定义显示别名
    showIcon?: string; // 展示相关，某些组件是否展示icon

    fileType?: 'input' | 'upload'; // 文件类型：输入地址 ｜ 上传文件

    // 局部变量
    variables?: IVariable[];
    options?: Record<string, any>[];

    open?: boolean; // 是否打开

    // 接入数据类型
    type?:
      | 'form' // 表单类型 + 表单数据： 需要 formId, pageId
      | 'entity' // 内置实体/数据模型 + 局部变量数据：需要 entity
      | 'dataSource' // 数据源 + 数据源数据
      | 'model'; // model
    entity?: IEntity; // 数据实体
    targetId?: string; // list target ID (formId for type=form or modelId for type=model)
    pageId?: string; // dataSource 中数据对象提取
    features?: IFeatures;
  };
  events?: Record<EventAction, IEvent[]>;
  parent?: string;
  theme?: {
    type: 'dark' | 'light';
  };
  children: IComponentInstance[] | number | string;
  pattern?: {
    display?: string;
    background?: 'image' | 'graduual' | 'color';
    animate?: IAnimate;

    // 渲染器渲染组件时不包裹 wrapper
    noWrapper?: boolean;
  };
  pipes?: {
    render?: Record<string, IPipe>;
  };
  extension?: {
    isExtension: boolean;
    extensionName: string;
    componentName: string;
    registry?: string;
    version: string;
  };
  editing?: {
    showMask?: boolean;
  };
}

export interface IComponentProps {
  value: string | number | boolean | any;
  formId?: string | undefined;
  node: IComponentInstance;
  children?: string | React.ReactNode;
  style: React.CSSProperties;
  className?: string;
  dataSource?: IDataSource;
  isEdit: boolean;
  variables: Record<string, any>;
  onSelectComponent: () => void;
  // for data source value change (eg: form data)
  onChangeValue: (value: any, keyPath?: string | null) => void;
  // for component tree change (eg: component.children)
  onChangeSelf: (keyPath: string, value: any) => void;
  onUpload: (files: any) => Promise<string[]>;
}

export interface ISchemaOptions {
  [key: string]: unknown;
}

export interface IComponentManifest<T> {
  type: string;
  componentName: string;
  category?: 'basic' | 'form' | 'icon' | 'extension';
  subCategory?: 'common' | 'mobile' | 'container' | 'data';
  title: string;
  icon: string;
  desc: string;
  // show in toolbar
  hideInToolbar?: boolean;
  schema: IComponentInstanceForm[];
  instance: T;
}

export interface IComponent<T> extends IComponentManifest<T> {}

export type IComponentInstanceCommon = IComponentInstance | IComponentInstanceForm;

export interface IComponentCommon extends IComponentManifest<IComponentInstance | IComponentInstanceForm> {}

export interface IFormRules {}

export interface IComponentInstanceForm extends IComponentInstance {
  formConfig: {
    keyPath?: string | null;
    label?: string;
    description?: string;
    placeholder?: string;
    labelStyle?: React.CSSProperties;
    verify?: {
      isRequired: boolean;
    };
    rulesVerifyInside?: boolean;
    componentName?: string;
    componentProps?: IProps;
    suffix?: string;
    valueFormatter?: string; // 'function(value, oldValue) { return value + "px"; }';
    editFormatter?: string; // send to edit formatter
    rules?: Array<any>; // Array<IFormRules>;
    formLayout?: 'horizontal' | 'vertical'; // 表单垂直 or 水平排列 只在 Form 组件可用
  };
}

export interface IComponentDefine<T> extends React.FunctionComponent<IComponentProps> {
  manifest?: IComponentManifest<T>;
}

export const enum ShapePathFormulasKeys {
  ROUND_RECT = 'roundRect',
  ROUND_RECT_DIAGONAL = 'roundRectDiagonal',
  ROUND_RECT_SINGLE = 'roundRectSingle',
  ROUND_RECT_SAMESIDE = 'roundRectSameSide',
  CUT_RECT_DIAGONAL = 'cutRectDiagonal',
  CUT_RECT_SINGLE = 'cutRectSingle',
  CUT_RECT_SAMESIDE = 'cutRectSameSide',
  MESSAGE = 'message',
  ROUND_MESSAGE = 'roundMessage',
  L = 'L',
  RING_RECT = 'ringRect',
  PLUS = 'plus',
  TRIANGLE = 'triangle',
  PARALLELOGRAM_LEFT = 'parallelogramLeft',
  PARALLELOGRAM_RIGHT = 'parallelogramRight',
  TRAPEZOID = 'trapezoid',
  BULLET = 'bullet',
  INDICATOR = 'indicator'
}

export interface ShapePoolItem {
  viewBox: [number, number];
  path: string;
  special?: boolean;
  pathFormula?: ShapePathFormulasKeys;
  outlined?: boolean;
}

export interface ShapeListItem {
  type: string;
  children: ShapePoolItem[];
}
