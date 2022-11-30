import React, { useEffect, useState } from 'react';
import style from './style.module.less';
import { Input, Radio, Spin, Pagination, RadioChangeEvent } from 'antd';
import ImageList from '../ImageList';
import { IExtensionContext, IPagination } from '@mtbird/shared';
import { IImageListSearch } from 'src/types';
import { getImageList, getImageTags } from 'src/services';
import { DEFAULT_PAGE } from '../../utils/constants';

export interface IImage {
  id: string;
  description: string;
  width: number;
  height: number;
  urls: {
    raw: string;
    small: string;
    thumb: string;
    full: string;
  };
}

interface ITag {
  id: string;
  name: string;
  englishName: string;
}

const ImageLibTab = ({ context }: { context: IExtensionContext }) => {
  const [search, setSearch] = useState<IImageListSearch>({
    ...DEFAULT_PAGE,
    query: 'business'
  });
  const [data, setData] = useState<IPagination<IImage[]>>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(false);

  const initList = async () => {
    const res = await getImageList(context.request, search);
    setData(res.data);
  };

  const initTags = async () => {
    const res = await getImageTags(context.request);
    setTags(res.data.data);
    setSearch({
      ...search,
      query: res.data.data[0].name
    });
  };

  useEffect(() => {
    setLoading(true);

    initTags()
      .then(() => {
        initList();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (key: string, value: string | number | RadioChangeEvent) => {
    setLoading(true);

    setSearch({
      ...search,
      [key]: value
    });
    initList();
    setLoading(false);
  };

  return (
    <div className={style.imageLibContainer}>
      {loading ? (
        <Spin className={style.imageLibContainer}></Spin>
      ) : (
        <>
          <Input.Search placeholder="搜索素材" onSearch={(e) => handleSearch('query', e)} size="small" />
          <Radio.Group
            className={style.tagRadio}
            defaultValue={search.query}
            buttonStyle="solid"
            size="small"
            onChange={(e) => handleSearch('query', e)}
          >
            <Radio.Button value="a">全部</Radio.Button>
            {tags.map((cur) => (
              <Radio.Button value={cur.englishName} key={cur.id}>
                {cur.name}
              </Radio.Button>
            ))}
          </Radio.Group>
          <ImageList context={context} list={data?.data || []} />
          <Pagination
            style={{ color: 'white' }}
            defaultCurrent={data.pageNum}
            total={data.total}
            onChange={(e) => handleSearch('pageNum', e)}
            size="small"
            showSizeChanger={false}
          />
        </>
      )}
    </div>
  );
};

export default ImageLibTab;
