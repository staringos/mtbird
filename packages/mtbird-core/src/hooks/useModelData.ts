import { IDataSource, IPageParams, IPagination } from '@mtbird/shared/dist/types';
import { useEffect, useState } from 'react';

const useModelData = (dataSource: IDataSource, targetId: string, pagination: IPageParams) => {
  const [data, setData] = useState<IPagination<any>>({ ...pagination, data: [] as any, total: 0 });

  const queryData = async () => {
    if (!targetId) return;
    const res = await dataSource?.queryData?.('model', '', targetId, pagination, {});
    setData(res as any);
  };

  useEffect(() => {
    queryData();
  }, [targetId]);

  return [data, queryData];
};

export default useModelData;
