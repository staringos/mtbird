import React from "react";
import { Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ShareArea from "./ShareArea";
import { IPageConfig } from "@mtbird/shared";

interface IProps {
  page: IPageConfig;
  children?: React.ReactNode | undefined;
}

const ShareDropdown = ({ page, children }: IProps) => {
  const notPublished = !(page as any).publishedHistoryId;
  return (
    <Dropdown
      overlay={<ShareArea pageId={page.id} />}
      trigger={["click"]}
      disabled={notPublished}
    >
      {children ? (
        children
      ) : (
        <Button
          disabled={notPublished}
          title={notPublished ? "请先发布" : "分享"}
        >
          分享 <DownOutlined />
        </Button>
      )}
    </Dropdown>
  );
};

export default ShareDropdown;
