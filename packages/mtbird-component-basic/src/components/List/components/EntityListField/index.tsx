import React from "react";
import {
  IComponentInstanceForm,
  IEntityField,
} from "@mtbird/shared/dist/types";
import { Form, Typography, Button } from "antd";
import FieldItem from "../EntityForm/FieldItem";
import styles from "./style.module.less";

const { Title } = Typography;

interface IProps {
  field: any;
  cur: IEntityField;
  node: IComponentInstanceForm;
  name: string | string[];
  rules: any[];
  label: any;
  onUpload: any;
  form: any;
}

const EntityListField = ({
  node,
  field,
  cur,
  name,
  rules,
  label,
  onUpload,
  form,
}: IProps) => {
  return (
    <Form.List {...field} name={name} rules={rules}>
      {(fields, { add, remove }) => {
        return (
          <>
            <Title level={5}>{label}</Title>
            {fields.map((field, i) => {
              return (
                <div className={styles.dataList} key={i}>
                  <div className={styles.dataListFields}>
                    {cur.childEntity?.map((child, j) => {
                      return (
                        <FieldItem
                          key={j}
                          field={field}
                          cur={child}
                          node={node}
                          onUpload={onUpload}
                          form={form}
                        />
                      );
                    })}
                  </div>
                  <div className={styles.dataListButton}>
                    <i
                      className="mtbird-icon mtbird-minus-circle"
                      onClick={() => remove(field.name)}
                    />
                  </div>
                </div>
              );
            })}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<i className="mtbird-icon mtbird-plugin" />}
              >
                添加
              </Button>
            </Form.Item>
          </>
        );
      }}
    </Form.List>
  );
};

export default EntityListField;
