import keys from 'lodash/keys';
import { DataType } from '@mtbird/shared';

export const DATA_TYPE: Record<DataType, string> = {
  STRING: '文本',
  NUMBER: '数字',
  BOOLEAN: 'Boolean',
  DATE: '日期',
  DATETIME: '日期时间',
  ENUM: '枚举',
  FILE: '文件',
  VIDEO: '视频',
  PHOTO: '图片',
  RELATE: '关联'
};

export const DATA_TYPE_OPTIONS = keys(DATA_TYPE).map((cur: string) => ({
  label: DATA_TYPE[cur],
  value: cur
}));
