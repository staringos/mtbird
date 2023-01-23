import Renderer from '@mtbird/renderer-web';
import React, { useState } from 'react';
import Loading from '@/components/Loading';
import { IPage, IPageHistory } from 'types/Page';
import styles from './style.module.css';
import Head from 'next/head';
import { DATA } from '@/utils/constants';
import InnerDataSource from '@/utils/InnerDataSource';

interface IProps {
  preview: boolean;
  appId?: string;
}

const PageRender = ({ preview, appId }: IProps) => {
  const [page, setPage] = useState<IPage | null>(DATA);
  const [data, setData] = useState({});
  const [dataSource, setDataSource] = useState(new InnerDataSource());

  const onClick = () => {};

  return (
    <div className={styles.previewContainer}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width, height=device-height, maximum-scale=1.0, user-scalable=no;" />
        <title>{page.title}</title>
        <meta name="description">{page.desc}</meta>
      </Head>
      <Renderer isZoom={true} dataSource={dataSource} pageConfig={page} platform={page.type === 'pc' ? 'pc' : 'mobile'} onClick={onClick} />
    </div>
  );
};

export default PageRender;
