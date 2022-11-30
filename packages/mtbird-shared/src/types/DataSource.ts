import { IColumn, IPageParams, IPagination } from './Common';

export type IData = string | number | boolean | Array<any> | Record<string, any>;

/**
 * 数据模型
 */
export interface IModel {
  id: string;
  name: string;
  fields: IModelField[];
}

/**
 * 数据模型字段
 */
export interface IModelField {
  id: string;
  displayName: string;
  key: string;
  type: 'STRING' | 'DATE' | 'DATETIME' | 'NUMBER' | 'BOOLEAN' | 'ENUM';
  options?: IOptionItem[];
}

export interface IOptionItem {
  label: string;
  value: string;
}

/**
 * Page data source: for data query storage and modify
 * Support component:
 * - form: modify form
 * - entity: modify inside dataSource
 * - model: modify model
 *
 * - variables config
 */
export interface IDataSource {
  getValue: (keyPath: string) => IData;
  getState: () => IData;
  submit?: (formId: string) => void;

  // common
  queryData?: (pageId: string, targetId: string, pagination: IPageParams, search: Record<string, any>) => Promise<IPagination<any>>;
  deleteData?: (targetId: string, dataId: string | number, dataType?: string) => Promise<boolean>;
  getColumns?: (pageId: string, targetId: string) => Promise<IColumn[]>;
  modifyData?: (targetId: string, dataId: string, data: Record<string, any>) => Promise<boolean>;
  createData?: (targetId: string, data: Record<string, any>) => Promise<boolean>;

  // for DataSource entity
  modify?: (key: string, data: IData) => Promise<boolean>;
  delete?: (key: string, id: string) => Promise<boolean>;
  create?: (key: string, data: IData) => Promise<IData>;

  // for form modify
  // deleteFormData?: (formId: string, dataId: string | number, dataType: string) => Promise<IData>;
  // queryFormData?: (pageId: string, formId: string, pagination: IPageParams, search: Record<string, any>) => Promise<IPagination<any>>;
  // getFormInstance?: (page: string, formId: string) => Promise<IComponentInstanceForm>;
}
