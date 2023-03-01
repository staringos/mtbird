import React from "react";
import { Button } from "antd";
import type { BaseRecordType } from "../EditableTable";

interface IOperationCellProps<RecordType> {
  editingKey: React.Key;
  record: RecordType;
  save: (key: React.Key) => void;
  omit: (key: React.Key) => void;
  edit: (record: RecordType) => void;
}

export const OperationCell = <RecordType extends BaseRecordType>({
  editingKey,
  record,
  save,
  edit,
  omit,
}: IOperationCellProps<RecordType>) => {
  const isEditing = record.key === editingKey;
  const canModify = !editingKey || editingKey === "";
  return isEditing ? (
    <Button type="text" onClick={() => save(record.key)}>
      <i className="mtbird-icon mtbird-save" />
    </Button>
  ) : (
    <span>
      <Button
        type="text"
        disabled={!canModify}
        onClick={() => edit(record)}
        style={{ marginRight: 8 }}
      >
        <i className="mtbird-icon mtbird-edit-square" />
      </Button>
      <Button
        type="text"
        disabled={!canModify}
        onClick={() => omit(record.key)}
      >
        <i className="mtbird-icon mtbird-delete" />
      </Button>
    </span>
  );
};
