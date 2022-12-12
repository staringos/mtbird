import React from 'react';
import { Button } from 'antd';
import { IComponentInstanceForm, IDataSource, IEntityField } from '@mtbird/shared/dist/types';
import type { ColumnsType } from 'antd/es/table';
import { generateFunction } from '@mtbird/core';

export const generateColumns = async (
  node: IComponentInstanceForm,
  dataSource: IDataSource,
  onToEdit: (id: number | string, index: number, row: any) => void,
  onToDelete: (id: number | string, index: number) => void
): Promise<ColumnsType<any>> => {
  const { data } = node;
  const { type, features, entity, targetId, pageId, additionColumns } = data as any;

  let columns: any[] = [];

  switch (type) {
    case 'model':
    // if type === form, get columns by query form instance and convert it to column data structure
    case 'form':
      if (!dataSource.getColumns) return [];
      columns = (await (dataSource.getColumns as any)(pageId, targetId)) || [];
      // columns = data ? covertFormToColumn(data) : [];
      break;
    case 'entity':
    default:
      columns = [
        ...entity.map((cur: IEntityField) => {
          return {
            title: cur.title,
            dataIndex: cur.keyPath
          };
        })
      ];
  }

  if (additionColumns && additionColumns.length > 0) {
    columns = columns.concat(additionColumns.map((col: any) => ({ ...col, render: col.render ? generateFunction(col.render) : undefined })));
  }

  columns.forEach((cur) => {
    if (cur.field?.type === 'PHOTO') {
      cur.type = cur.type + '1';
      cur.render = (src: string) => {
        if (!src) return src;
        return <img src={src} style={{ width: 100 }} />;
      };
    }
  });

  if (!features || features?.delete || features?.modify) {
    columns.push({
      title: '操作',
      dataIndex: 'id',
      render: (id: number | string, row: any, i: number) => {
        return (
          <div>
            {(!features || features?.modify) && (
              <Button size="small" type="text" onClick={() => onToEdit(id, i, row)}>
                <i className="mtbird-icon mtbird-edit-square" />
              </Button>
            )}
            {(!features || features?.delete) && (
              <Button size="small" type="text" onClick={() => onToDelete(id, i)}>
                <i className="mtbird-icon mtbird-delete" />
              </Button>
            )}
          </div>
        );
      }
    });
  }

  return columns;
};
