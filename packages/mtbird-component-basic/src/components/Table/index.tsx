import React, { useMemo } from "react";
import FormItemWrapper from "src/toolComponents/FormItemWrapper";

import styles from "./style.module.less";

import { EditableTable } from "./components/EditableTable";
import manifest from "./manifest";
import { IComponentProps } from "@mtbird/shared";

const TableComponent = (allProps: IComponentProps) => {
  const {
    node: { data },
    value,
    onChangeValue,
    isEdit,
  } = allProps;

  const columns: any = useMemo(() => {
    const options = data?.options || [];

    return options.map((item) => ({
      title: item.title,
      key: item.title,
      dataIndex: item.title,
      editable: true,
      inputType: item.type,
      required: item.required === "true",
    }));
  }, [data?.options]);

  const component = (
    <EditableTable
      className={styles.mtFormTable}
      disabled={isEdit}
      columns={columns}
      pagination={false}
      dataSource={value ?? []}
      setDataSource={onChangeValue}
    />
  );

  return (
    <FormItemWrapper
      {...allProps}
      renderChildrenOnly={true}
      component={component}
    ></FormItemWrapper>
  );
};

TableComponent.manifest = manifest;

export default TableComponent;
