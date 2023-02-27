import React from "react";
import { Button, Select, Radio, message, Modal } from "antd";
import { IPageConfig } from "@mtbird/shared";
import { PreviewMobileType } from "@mtbird/core";
import keys from "lodash/keys";
import { DesktopOutlined, MobileOutlined } from "@ant-design/icons";
import ShareDropdown from "../../ShareDropdown";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";

interface IProps {
  page: IPageConfig;
  historyId?: string;
  currentMobile?: string;
  isMobile: boolean;
  platform: string;
  onPlatformChange: (e: string) => void;
  onSizeChange?: (e: any) => void;
}
const { confirm } = Modal;

const PreviewHeader = ({
  page,
  historyId,
  currentMobile,
  onSizeChange,
  isMobile,
  platform,
  onPlatformChange,
}: IProps) => {
  const DeviceSelect = (
    <Select onChange={onSizeChange} value={currentMobile}>
      {keys(PreviewMobileType).map((cur: any) => {
        return <Select.Option key={cur}>{cur}</Select.Option>;
      })}
    </Select>
  );

  const PlatFormRadio = (
    <Radio.Group
      key="3"
      value={platform}
      onChange={(e) => onPlatformChange(e.target.value)}
    >
      <Radio.Button value="pc">
        <DesktopOutlined />
      </Radio.Button>
      <Radio.Button value="mobile">
        <MobileOutlined />
      </Radio.Button>
    </Radio.Group>
  );

  const handlePublish = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "确定要发布该页面的最新版本吗？",
      onOk: async () => {
        message.success("发布成功!");
      },
    });
  };

  let extra = [
    PlatFormRadio,
    <ShareDropdown key="1" page={page} />,
    <Button
      key="2"
      type="primary"
      onClick={handlePublish}
      disabled={historyId === (page as any).publishedHistoryId}
    >
      发布
    </Button>,
  ];

  if (isMobile) {
    extra = [DeviceSelect, ...extra];
  }

  return (
    <PageHeader
      ghost={false}
      onBack={() => (location.href = "/")}
      title={page.title}
    />
  );
};

export default PreviewHeader;
