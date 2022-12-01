import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IComponentInstanceForm, IComponentProps, IDataSource, IPageParams } from '@mtbird/shared';
import styles from './style.module.less';
import EntityForm from './components/EntityForm';
import manifest from './manifest';
import { generateColumns } from './utils';
import FilterDropdown from './components/FilterDropdown';
import { SorterResult } from 'antd/lib/table/interface';
import { convertColumnsToEntity } from 'src/utils/component';

const ListComponent = ({ node, value, onChangeValue, dataSource }: IComponentProps) => {
  const { data } = node;
  const { pageId, targetId, entity, features, type, additionColumns } = data as any;
  const [editData, setEditData] = useState<null | any>(null);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);
  const [pagination, setPagination] = useState<IPageParams>({
    pageNum: 1,
    pageSize: 3
  });
  const [columns, setColumns] = useState<ColumnsType<any>>([]);
  const [search, setSearch] = useState<Record<string, any>>({});
  const [tableData, setTableData] = useState({
    data: value,
    total: 0
  });
  const [sort, setSort] = useState({});
  const modifyEntity = type === 'entity' ? entity : convertColumnsToEntity(columns, additionColumns);
  const needConfig = (type === 'model' || type === 'form') && !targetId;

  const handleOpenAdd = () => {
    setEditData(null);
    setShowEditor(true);
  };

  const handleToEdit = (id: number | string, index: number, row: any) => {
    setEditIndex(index);
    setEditData(row);
    setShowEditor(true);
  };

  const handleToDelete = async (id: number | string, index: number) => {
    switch (type) {
      case 'form':
      case 'model':
        await dataSource?.deleteData?.(targetId, id, type);
        message.success('操作成功!');
        refreshTable();
        break;
      case 'entity':
      default:
        // TODO delete by index, optimize delete by id later
        onChangeValue(tableData.data.filter((cur: any, i: number) => index !== i));
    }
  };

  const init = async () => {
    const columns = await generateColumns(node as IComponentInstanceForm, dataSource as IDataSource, handleToEdit, handleToDelete);

    columns.forEach((col: any) => {
      if (col.title === '操作') return;
      // search
      if (features?.search) {
        col.filterDropdown = () => {
          return (
            <FilterDropdown
              value={search[col.dataIndex]}
              onChange={(e) => setSearch({ ...search, [col.dataIndex]: e })}
              onClear={() => {
                delete search[col.dataIndex];
                setSearch(search);
              }}
              label={col.title}
            />
          );
        };
        col.filterIcon = (filtered: boolean) => <i className="mtbird-icon mtbird-search" style={{ color: filtered ? '#1890ff' : undefined }} />;
        col.onFilter = () => {};

        // col.onFilterDropdownOpenChange = (visible: boolean) => {};
        // col.filters = [
        //   {
        //     text: 'London',
        //     value: 'London'
        //   },
        //   {
        //     text: 'New York',
        //     value: 'New York'
        //   }
        // ];
      }

      if (features?.sort) {
        col.sorter = true;
        col.sortDirections = ['descend', 'ascend'];
      }
    });

    setColumns(columns);
  };

  useEffect(() => {
    if (needConfig) return;
    init();
  }, [tableData, node.data]);

  const refreshTable = async () => {
    switch (data?.type) {
      case 'model':
      case 'form':
        if (!dataSource?.queryData) return;
        const res = await dataSource?.queryData(pageId, targetId, pagination, search);
        setTableData({ ...res, data: res.data.map((cur: any) => ({ ...cur, ...cur.data })) } as any);
        break;
      case 'entity':
      default:
        setTableData({ ...tableData, data: value });
    }
    // if (data?.type !== 'form' || !dataSource?.queryData) return;
  };

  useEffect(() => {
    refreshTable();
  }, [pagination, search, value]);

  const handleFinish = () => {
    setEditData({});
    setShowEditor(false);
    if (type === 'model') {
      refreshTable();
    }
  };

  const handlePageChanged = (e: number) => {
    setPagination({
      ...pagination,
      pageNum: e
    });
  };

  const handleTableChange = (pagination: any, filters: Record<string, any>, sorter: SorterResult<any>) => {
    console.log('pagination:', pagination, filters, sorter);
  };

  if (needConfig) return <div>请配置数据源</div>;

  return (
    <div className={styles.listWrapper}>
      <Space style={{ marginBottom: 16 }}>
        {features?.add && (
          <Button size="small" shape="circle" onClick={handleOpenAdd}>
            <i className="mtbird-icon mtbird-edit-square" />
          </Button>
        )}
      </Space>
      <Modal visible={showEditor} footer={false} onCancel={handleFinish}>
        {showEditor && (
          <EntityForm
            index={editIndex}
            node={node as IComponentInstanceForm}
            value={value}
            entity={modifyEntity}
            onFinish={handleFinish}
            onChangeValue={onChangeValue}
            editData={editData}
            dataSource={dataSource as IDataSource}
          />
        )}
      </Modal>
      {columns && columns.length > 0 && (
        <Table
          pagination={features?.pagination ? { total: tableData.total, pageSize: pagination.pageSize, onChange: handlePageChanged } : false}
          dataSource={tableData.data}
          columns={columns}
          size="small"
          rowKey="index"
          onChange={handleTableChange}
        />
      )}
    </div>
  );
};

ListComponent.manifest = manifest;

export default ListComponent;
