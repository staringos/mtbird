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

/**
 * 数据模型字段
 */
export interface IModelField {
  id: string;
  displayName: string;
  key: string;
  type: 'STRING' | 'DATE' | 'DATETIME' | 'NUMBER' | 'BOOLEAN' | 'ENUM';
  options?: IOptionItem[];
  isSystem?: boolean;
}
