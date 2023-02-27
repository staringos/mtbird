import Renderer from "@mtbird/renderer-web";
import React, { useState } from "react";
import { IPage } from "@/types/Page";
import styles from "./style.module.css";
import Head from "next/head";
import { DATA } from "@/utils/constants";
import InnerDataSource from "@/utils/InnerDataSource";
import useSSR from "@/hooks/useSSR";

interface IProps {
  preview: boolean;
  appId?: string;
}

const PageRender = ({ preview, appId }: IProps) => {
  const [page, setPage] = useState<IPage | null>(DATA as any);
  const [data, setData] = useState({});
  const [dataSource, setDataSource] = useState(new InnerDataSource());
  const isSSR = useSSR();

  if (isSSR) return <div />;

  return (
    <div className={styles.previewContainer}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, height=device-height, maximum-scale=1.0, user-scalable=no;"
        />
        <title>{page?.title}</title>
        <meta name="description">{page?.desc}</meta>
      </Head>
      <Renderer
        isZoom={true}
        dataSource={dataSource}
        pageConfig={page as any}
        platform={page?.type === "pc" ? "pc" : "mobile"}
      />
    </div>
  );
};

export default PageRender;
