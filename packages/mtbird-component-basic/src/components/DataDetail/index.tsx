import { IComponentProps } from '@mtbird/shared';
import React, { useEffect, useState } from 'react';
import manifest from './manifest';
import styles from './style.module.less';

const DataDetail = ({ node, dataSource, childrenRender, variables, style }: IComponentProps) => {
  const { targetId, type, search } = node.data || {};
  const [data, setData] = useState<Record<string, any> | undefined>();

  const initData = async () => {
    if (!targetId) return;
    if (type === 'model') {
      const res = await dataSource?.queryDataDetail?.(type, targetId, search || []);
      setData((res?.data || {}) as Record<string, any>);
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
