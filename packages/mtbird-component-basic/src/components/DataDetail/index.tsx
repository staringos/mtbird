import { IComponentProps } from '@mtbird/shared';
import React, { useEffect, useState } from 'react';
import manifest from './manifest';
import styles from './style.module.less';

const DataDetail = ({ node, dataSource, childrenRender, variables, style }: IComponentProps) => {
  const { targetId, type } = node.data || {};
  const [data, setData] = useState<Array<Record<string, any>>>([]);

  const initData = async () => {
    if (!targetId) return;
    if (type === 'model') {
      // TODO new api for data
      // const res = await dataSource?.queryData?.(type, '', targetId, {}, {});
      // setData(res as any);
    }
  };

  useEffect(() => {
    initData();
  }, [targetId]);

  const newVariables = { ...variables, [`$detail${targetId}Data`]: data };
  return (
    <div className={styles.dataDetail} style={style}>
      {childrenRender({ variables: newVariables }, 0) as any}
    </div>
  );
};

DataDetail.manifest = manifest;

export default DataDetail;
