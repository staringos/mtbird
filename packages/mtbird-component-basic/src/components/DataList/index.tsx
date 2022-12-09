import { IComponentProps, IPageParams, IPagination } from '@mtbird/shared';
import React, { useEffect, useState } from 'react';
import manifest from './manifest';
import styles from './style.module.less';

const DataList = ({ node, children, dataSource }: IComponentProps) => {
  const { targetId, type } = node.data || {};
  const [pagination, setPagination] = useState<IPageParams>({
    pageNum: 1,
    pageSize: 10
  });
  const [data, setData] = useState<IPagination<any>>({ ...pagination, data: [] as any, total: 0 });

  const initData = async () => {
    if (!targetId) return;
    if (type === 'model') {
      const res = await dataSource?.queryData?.('', targetId, pagination, {});
      setData(res as any);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className={styles.dataList}>
      {/* {isEdit && <DataEditableItem renderChildren={children} node={node} />} */}
      {data.data.map((cur: any) => {
        return <div className={styles.dataListChild}>{children}</div>;
      })}
    </div>
  );
};

DataList.manifest = manifest;

export default DataList;
