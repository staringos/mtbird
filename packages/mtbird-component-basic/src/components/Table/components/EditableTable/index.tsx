import React, { ForwardedRef, useState, useMemo } from 'react';

import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { EditableCell } from '../EditableCell';
import { OperationCell } from '../OperationCell';

import styles from './style.module.less';

export interface BaseRecordType {
  key: string;
}

export type EditableColumnsType<RecordType = unknown> = (ColumnsType<RecordType>[number] & {
  dataIndex: string;
  editable?: boolean;
  required?: boolean;
  inputType: 'number' | 'text';
})[];

export type DefaultRecordType<RecordType = unknown> = Partial<Omit<RecordType, 'key'>>;
export interface EditableTableProps<RecordType = unknown> extends Omit<TableProps<RecordType>, 'columns'> {
  columns: EditableColumnsType<RecordType>;
  setDataSource: (data: RecordType[]) => void;
  defaultRecord?: DefaultRecordType<RecordType>;
  disabled?: boolean;
}

const InternalEditableTable = <RecordType extends BaseRecordType>(props: EditableTableProps<RecordType>, ref: ForwardedRef<HTMLDivElement>) => {
  const { dataSource, setDataSource, columns, disabled } = props;

  const defaultRecord = useMemo(
    () =>
      columns.reduce<DefaultRecordType<RecordType>>(
        (res, cur) => {
          res[cur.dataIndex] = cur.inputType === 'text' ? '' : 0;
          return res;
        },
        { ...props.defaultRecord }
      ),
    [props.defaultRecord, columns]
  );

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [count, setCount] = useState(dataSource?.length ?? 0);

  const isEditing = (record: RecordType) => record.key === editingKey;

  function actionProxy(fn: Function) {
    return (...args: any[]) => {
      if (!disabled) {
        fn.apply(fn, args);
      }
    };
  }

  const edit = actionProxy((record: Partial<RecordType>) => {
    const { key } = record;
    if (!key) {
      return;
    }
    form.setFieldsValue({ ...defaultRecord, ...record });
    setEditingKey(key);
  });

  const cancel = actionProxy(() => setEditingKey(''));

  const omit = actionProxy((key: React.Key) => {
    if (Array.isArray(dataSource) && dataSource.length > 0) {
      const index = dataSource.findIndex((item) => key === item.key);
      if (index >= 0) {
        const newData = [...dataSource];
        newData.splice(index, 1);
        setDataSource(newData);
      }
    }
    setEditingKey('');
  });

  const save = actionProxy(async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as RecordType;

      const newData = [...(dataSource || [])];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  });

  const add = actionProxy(() => {
    const newData = { ...defaultRecord, key: `${count}` } as RecordType;
    setDataSource([...(dataSource || []), newData]);
    setCount(count + 1);
    edit(newData);
  });

  const mergedColumns = useMemo(() => {
    const mergedColumns = columns.map(({ editable, ...col }) => ({
      ...col,
      onCell: (record) => ({
        record,
        required: col.required,
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: editable && isEditing(record)
      })
    })) as ColumnsType<RecordType>;
    mergedColumns.push({
      title: '操作',
      dataIndex: 'operation',
      width: 'max-content',
      render: (_: any, record: RecordType) => <OperationCell record={record} editingKey={editingKey} save={save} omit={omit} edit={edit} />
    });
    return mergedColumns;
  }, [columns]);

  const tableProps = {
    ...props,
    ref,
    components: {
      body: {
        cell: EditableCell
      }
    },
    bordered: true,
    columns: mergedColumns,
    rowClassName: styles.editableTableRow,
    pagination: { onChange: cancel }
  };

  return (
    <div className={styles.editableTable}>
      <Form form={form} component={false}>
        <Table {...tableProps} />
      </Form>
      <Button disabled={!!editingKey && editingKey !== ''} onClick={add} type="default">
        添加数据
      </Button>
    </div>
  );
};

const ForwardEditableTable = React.forwardRef(InternalEditableTable) as <RecordType extends BaseRecordType>(
  props: React.PropsWithChildren<EditableTableProps<RecordType>> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

type InternalTableType = typeof ForwardEditableTable;
export const EditableTable = ForwardEditableTable as InternalTableType;
