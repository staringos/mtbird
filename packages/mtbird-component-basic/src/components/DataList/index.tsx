import { IComponentProps, IPageParams, IPagination } from '@mtbird/shared';
import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import manifest from './manifest';
import styles from './style.module.less';

const DataList = ({ node, dataSource, childrenRender, variables }: IComponentProps) => {
  const { targetId, type } = node.data || {};
  const [pagination, setPagination] = useState<IPageParams>({
    pageNum: 1,
    pageSize: 10
  });
  const [data, setData] = useState<IPagination<any>>({ ...pagination, data: [] as any, total: 0 });

  const initData = async () => {
    if (!targetId) return;
    if (type === 'model') {
      const res = await dataSource?.queryData?.(type, '', targetId, pagination, {});
      setData(res as any);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  let $maps = get(variables, '$maps');

  if (!$maps) $maps = [1];
  else $maps.push($maps.length);

  const mapKey = $maps[$maps.length - 1];

  return (
    <div className={styles.dataList}>
      {data.data.map((cur: any, i: number) => {
        const newVariables = { ...variables, $maps, [`$maps${mapKey}Model`]: {}, [`$maps${mapKey}Data`]: cur, [`$maps${mapKey}Index`]: i };
        return childrenRender({ variables: newVariables }, i);
      })}
    </div>
  );
};

DataList.manifest = manifest;

export default DataList;
