import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styles from './style.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode';

interface IProps {
  pageId: string;
}

const ShareArea = ({ pageId }: IProps) => {
  const [qrcodeUrl, setQRCodeUrl] = useState('');
  const url = `${location.protocol}//${location.host}/page/${pageId}`;

  const handleOpenOffical = (href: string) => {
    window.open(href);
  };

  QRCode.toDataURL(url).then((res: string) => {
    setQRCodeUrl(res);
    console.log(res);
  });

  return (
    <div className={styles.shareContainer}>
      <h2>分享页面</h2>
      <Input.Group compact>
        <Input id="page-url" style={{ width: 'calc(100% - 63.8px)' }} value={url} />
        <CopyToClipboard text={url}>
          <Button id="copy-button" type="default" data-clipboard-target="#page-url">
            复制
          </Button>
        </CopyToClipboard>
      </Input.Group>
      <div className={styles.qrcodeContainer}>
        <img className={styles.qrcode} src={qrcodeUrl} />
      </div>
      <Button type="primary" onClick={() => handleOpenOffical(url)}>
        打开正式版
      </Button>
    </div>
  );
};

export default ShareArea;
