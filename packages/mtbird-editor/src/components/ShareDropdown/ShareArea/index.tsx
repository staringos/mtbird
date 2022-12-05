import React, { useContext, useState } from 'react';
import { Input, Button, Dropdown, MenuProps, Space } from 'antd';
import styles from './style.module.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Model from 'src/store/types';
import { toPng } from 'html-to-image';

const QRCode = require('qrcode');

interface IProps {
  pageId: string;
}

const ShareArea = ({ pageId }: IProps) => {
  const { state } = useContext(Model);
  const [qrcodeUrl, setQRCodeUrl] = useState('');
  const url = `${location.protocol}//${location.host}/page/${pageId}`;

  const handleOpenOffical = (href: string) => {
    window.open(href);
  };

  QRCode.toDataURL(url).then((res: string) => {
    setQRCodeUrl(res);
  });

  function downloadURI(uri: string, name: string) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  }

  const handleExportPNG = async () => {
    const dom: any = document.getElementById(state.pageConfig?.data?.id || '')?.parentNode;
    const dataUrl = await toPng(dom, { quality: 0.8 });

    downloadURI(dataUrl, `${state.pageConfig.title}.png`);
  };

  return (
    <div className={styles.shareContainer}>
      <h2>分享页面</h2>
      <p>请 预览 - 发布 后查看</p>
      <Input.Group compact>
        <Input className={styles.shareContainerUrl} id="page-url" style={{ width: 'calc(100% - 63.8px)' }} value={url} />
        <CopyToClipboard text={url}>
          <Button className={styles.shareContainerCopyButton} id="copy-button" type="default" data-clipboard-target="#page-url">
            复制
          </Button>
        </CopyToClipboard>
      </Input.Group>
      <div className={styles.qrcodeContainer}>
        <img className={styles.qrcode} src={qrcodeUrl} />
      </div>
      <div className={styles.shareFooters}>
        <Button type="primary" onClick={() => handleOpenOffical(url)} size="small">
          打开
        </Button>
        <Button type="default" onClick={() => handleExportPNG()} size="small">
          导出图片(.png)
        </Button>
      </div>
      {/* <Button type="primary" onClick={() => handleExportPny(url)}>
        导出
      </Button>

      <Button type="default" icon={<i className="mtbird-icon mtbird-download" />}>
        导出
      </Button> */}
    </div>
  );
};

export default ShareArea;
