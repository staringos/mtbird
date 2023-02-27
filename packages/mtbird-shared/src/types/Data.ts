/**
 * 数据模型
 */
export interface IModel {
  id: string;
  name: string;
  fields: IModelField[];
}

export interface IOptionItem {
  label: string;
  value: string;
}

export type DataType =
  | "STRING"
  | "DATE"
  | "DATETIME"
  | "NUMBER"
  | "BOOLEAN"
  | "ENUM"
  | "FILE"
  | "PHOTO"
  | "VIDEO"
  | "RELATE";

/**
 * 数据模型字段
 */
export interface IModelField {
  id: string;
  displayName: string;
  key: string;
  type: DataType;
  options?: IOptionItem[];
  isSystem?: boolean;
}
