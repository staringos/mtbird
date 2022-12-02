import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { ColumnTitle } from 'antd/es/table/interface';

interface EditableCellProps extends Omit<React.TdHTMLAttributes<any>, 'title'> {
  editing: boolean;
  dataIndex: string;
  title: ColumnTitle<any>;
  inputType: 'number' | 'text';
  record: Record<string, any>;
  index: number;
  children: React.ReactNode;
  required?: boolean;
}

export const EditableCell: React.FC<EditableCellProps> = (cellProps) => {
  const { editing, dataIndex, title, inputType, record, index, required, children, ...restProps } = cellProps;
  const InputComponent = inputType === 'number' ? InputNumber : Input;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: required,
              message: ''
            }
          ]}
        >
          <InputComponent placeholder={`请输入${title}`} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
