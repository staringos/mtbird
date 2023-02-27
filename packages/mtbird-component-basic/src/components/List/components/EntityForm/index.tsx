import React, { useEffect } from "react";
import { Form, Input, Button, message, Select, Space } from "antd";
import {
  IEntity,
  IEntityField,
  IComponentInstanceForm,
  IDataSource,
} from "@mtbird/shared";
import { generateKeys, generateEntityValue, COMPONENT } from "@mtbird/core";
import { Upload } from "@mtbird/ui";
import styles from "./style.module.less";

interface IProps {
  entity: IEntity;
  node: IComponentInstanceForm;
  editData: any;
  onChangeValue: (value: any) => void;
  onFinish: () => void;
  value: any;
  index: number | undefined;
  dataSource: IDataSource;
  onUpload: any;
}

const EntityForm = ({
  entity,
  node,
  editData,
  value,
  onChangeValue,
  onFinish,
  index,
  dataSource,
  onUpload,
}: IProps) => {
  const { formConfig, data } = node;
  const { type, targetId } = data as any;
  const [form] = Form.useForm();

  useEffect(() => {
    if (!editData) {
      const defaultValue = generateEntityValue(entity);
      form.resetFields();
      return form.setFieldsValue(defaultValue);
    }
    form.setFieldsValue(editData);
  }, [editData]);

  const handleSubmit = async (formData: Record<string, any>) => {
    if (!formData) return;

    // for model
    if (type === "model") {
      if (editData)
        await dataSource.modifyData?.(
          targetId,
          editData.id as string,
          formData as Record<string, any>
        );
      else
        await dataSource.createData?.(
          targetId,
          formData as Record<string, any>
        );
      // for entity
    } else {
      const curValue = value || [];
      if (!editData) curValue[COMPONENT.ID_KEY] = generateKeys();

      onChangeValue(
        editData
          ? curValue.map((cur: any, i: number) => {
              // update by replace
              return i === index ? formData : cur;
            })
          : [...curValue, formData] // create by push
      );
    }

    form.resetFields();
    message.success("操作成功!");
    onFinish();
  };

  const fieldChangeHandler = (keyPath: string) => {
    return (value: any) => {
      form.setFieldValue(keyPath, value);
    };
  };

  return (
    <Form
      className={styles.entityFormContainer}
      onFinish={handleSubmit}
      form={form}
    >
      {entity.map((cur: IEntityField) => {
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
            <Form.Item label={label} name={cur.keyPath} rules={rules}>
              <Select options={cur.options} />
            </Form.Item>
          );
        }

        if (cur.type === "PHOTO" || cur.type === "VIDEO") {
          return (
            <Form.Item label={label} name={cur.keyPath} rules={rules}>
              <Space direction="vertical">
                <Input
                  value={form.getFieldValue(cur.keyPath)}
                  onChange={(e) =>
                    fieldChangeHandler(cur.keyPath)(e.target.value)
                  }
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

        return (
          <Form.Item label={label} name={cur.keyPath} rules={rules}>
            <Input />
          </Form.Item>
        );
      })}
      <Form.Item>
        <Button type="primary" htmlType="submit" size="small">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EntityForm;
