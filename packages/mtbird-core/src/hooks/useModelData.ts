import {
  IDataSource,
  IModelData,
  IPageParams,
  IPagination,
} from "@mtbird/shared/dist/types";
import { useEffect, useState } from "react";

const useModelData = <T>(
  dataSource: IDataSource,
  targetId: string,
  pagination: IPageParams
): [
  IPagination<IModelData<T>[]>,
  React.Dispatch<React.SetStateAction<IPagination<IModelData<T>[]>>>
] => {
  const [data, setData] = useState<IPagination<IModelData<T>[]>>({
    ...pagination,
    data: [],
    total: 0,
  });

  const queryData = async () => {
    if (!targetId) return;
    const res = await dataSource?.queryData?.(
      "model",
      "",
      targetId,
      pagination,
      {}
    );
    setData(res as IPagination<IModelData<any>[]>);
  };

  useEffect(() => {
    queryData();
  }, [targetId]);

  return [data, queryData];
};

export default useModelData;
