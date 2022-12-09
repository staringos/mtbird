import { IOptionItem } from './Data';

export interface IPagination<T> {
  pageNum: number;
  pageSize: number;
  total?: number;
  data?: T;
}

export interface IPageParams {
  pageNum: number;
  pageSize: number;
}

export interface IPosition {
  left: number;
  top: number;
  width: number;
  height: number;
  right?: number;
  bottom?: number;
}

export interface IEntityField {
  title: string;
  keyPath: string;
  isRequired: boolean;
  type: 'string' | 'number' | 'select';
  default: string | number;
  options?: IOptionItem[];
}

export type IEntity = IEntityField[];

export type IPart = {
  label: string;
  value: string;
};

export type IListColumn = {
  label: string;
  value: string;
  render: (val: any, row: any) => any;
};
