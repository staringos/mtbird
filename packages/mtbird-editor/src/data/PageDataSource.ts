import { SchemaDataSource } from '@mtbird/helper-component';
import { IDataSource, IPageParams } from '@mtbird/shared';

export default class PageDataSource extends SchemaDataSource {
  constructor(state: any, setState: (keyPath: string, data: any) => void, modelDataSource: IDataSource) {
    super(state, setState);
    this.modelDataSource = modelDataSource;
  }

  modelDataSource?: IDataSource = undefined;

  // common
  queryData = (pageId: string, targetId: string, pagination: IPageParams, search: Record<string, any>) => {
    return this.modelDataSource?.queryData?.(pageId, targetId, pagination, search);
  };

  deleteData = (targetId: string, dataId: string | number, dataType?: string) => {
    return this.modelDataSource?.deleteData?.(targetId, dataId, dataType);
  };
  getColumns = (pageId: string, targetId: string) => {
    return this.modelDataSource?.getColumns?.(pageId, targetId);
  };
  modifyData = (targetId: string, dataId: string, data: Record<string, any>) => {
    return this.modelDataSource?.modifyData?.(targetId, dataId, data);
  };
  createData = (targetId: string, data: Record<string, any>) => {
    return this.modelDataSource?.createData?.(targetId, data);
  };
}
