import React from "react";
import { Button, Form, Input, Select, Space, Switch, Typography } from "antd";
import {
  IComponentInstanceForm,
  IEntityField,
} from "@mtbird/shared/dist/types";
import Upload from "../../../Upload";
import EntityListField from "../EntityListField";

interface IProps {
  cur: IEntityField;
  node: IComponentInstanceForm;
  form: any;
  onUpload: any;
  field?: any;
}

const FieldItem = ({ cur, node, form, onUpload, field }: IProps) => {
  const name =
    !field?.name && field?.name !== 0 ? cur.keyPath : [field.name, cur.keyPath];
  const newField = field || {};

  const fieldChangeHandler = (keyPath: string) => {
    return (value: any) => {
      form.setFieldValue(keyPath, value);
    };
  };

  const { formConfig } = node;

  const label = (
    <label style={{ width: 100, ...formConfig.labelStyle }}>
      {cur.title || " "}
    </label>
  );
  const rules = cur.isRequired
    ? [{ required: true, message: `${cur.title}是必填的` }]
    : [];

  if (cur.type === "ENUM") {
    return (
      <Form.Item {...newField} label={label} name={name} rules={rules}>
        <Select options={cur.options} />
      </Form.Item>
    );
  }

  if (cur.type === "BOOLEAN") {
    return (
      <Form.Item {...newField} label={label} name={name} rules={rules}>
        <Switch />
      </Form.Item>
    );
  }

  if (cur.type === "PHOTO" || cur.type === "VIDEO") {
    return (
      <Form.Item {...newField} label={label} name={name} rules={rules}>
        <Space direction="vertical">
          <Input
            value={form.getFieldValue(cur.keyPath)}
            onChange={(e) => fieldChangeHandler(cur.keyPath)(e.target.value)}
          />
          <Upload
            maxCount={1}
            value={form.getFieldValue(cur.keyPath)}
            onChange={fieldChangeHandler(cur.keyPath)}
            onUpload={onUpload}
          />
        </Space>
      </Form.Item>
    );
  }

  if (cur.type === "DATA_ARRAY") {
    return (
      <EntityListField
        cur={cur}
        node={node}
        form={form}
        label={label}
        onUpload={onUpload}
        field={newField}
        rules={rules}
        name={name}
      />
    );
  }

  return (
    <Form.Item {...newField} label={label} name={name} rules={rules}>
      <Input />
    </Form.Item>
  );
};

export default FieldItem;
