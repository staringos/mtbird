import { IListColumn, IPageParams, IPagination } from './Common';
import { ISearch } from './Component';

export type IData = string | number | boolean | Array<any> | Record<string, any>;

export interface IModelData<T> {
  id: string;
  createAt: string;
  updateAt: string;
  data: Record<string, any> | T;
  creatorId: string;
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
  queryData?: (
    targetType: 'form' | 'model',
    pageId: string,
    targetId: string,
    pagination: IPageParams,
    search: Record<string, any>
  ) => Promise<IPagination<any>>;
  queryDataDetail?: (targetType: 'form' | 'model', targetId: string, search: ISearch[]) => Promise<Record<string, IData>>;

  deleteData?: (targetId: string, dataId: string | number, dataType?: string) => Promise<boolean>;
  getColumns?: (pageId: string, targetId: string) => Promise<IListColumn[]>;
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
