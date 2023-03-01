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
import FieldItem from "./FieldItem";

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
  const { data } = node;
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

  return (
    <Form
      className={styles.entityFormContainer}
      onFinish={handleSubmit}
      form={form}
    >
      {entity.map((cur: IEntityField) => {
        return (
          <FieldItem cur={cur} node={node} form={form} onUpload={onUpload} />
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
