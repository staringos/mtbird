import keys from "lodash/keys";
import { DataType } from "@mtbird/shared";

export const DATA_TYPE: Record<DataType, string> = {
  STRING: "文本",
  NUMBER: "数字",
  BOOLEAN: "Boolean",
  DATE: "日期",
  DATETIME: "日期时间",
  ENUM: "枚举",
  FILE: "文件",
  VIDEO: "视频",
  PHOTO: "图片",
  RELATE: "关联",
};

export const DATA_TYPE_OPTIONS = keys(DATA_TYPE).map((cur: string) => ({
  label: DATA_TYPE[cur],
  value: cur,
}));

export const DATA_MODEL_SYSTEM_FIELDS = [
  {
    displayName: "ID",
    key: "id",
    type: "STRING",
    isSystem: true,
  },
  {
    displayName: "创建时间",
    key: "createdAt",
    type: "DATETIME",
    isSystem: true,
  },
  {
    displayName: "更新时间",
    key: "updatedAt",
    type: "DATETIME",
    isSystem: true,
  },
  {
    displayName: "提交用户",
    key: "creatorId",
    type: "DATETIME",
    isSystem: true,
  },
];

export const DATA_MODEL_SYSTEM_COLUMNS = DATA_MODEL_SYSTEM_FIELDS.map((cur) => {
  return {
    title: cur.displayName,
    dataIndex: cur.key,
  };
});

export const DATA_MODEL_SYSTEM_OPTIONS = DATA_MODEL_SYSTEM_FIELDS.map((cur) => {
  return {
    label: cur.displayName,
    value: cur.key,
  };
});
