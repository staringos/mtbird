import React, { useState } from 'react';
import { IPageConfig } from '@mtbird/shared';
import PreviewHeader from '../PreviewHeader';
import styles from './style.module.css';
import { PreviewMobileType } from '@mtbird/core';

interface IProps {
  page: IPageConfig;
  historyId?: string;
  onPlatformChange: (e: string) => void;
  platform: string;
}

const H5Preview = ({ page, historyId, platform, onPlatformChange }: IProps) => {
  const [currentMobile, setCurrentMobile] = useState('iPhone SE');
  const handleSizeChanged = (e: any) => {
    setCurrentMobile(e);
  };
  return (
    <div className={styles.h5PreviewWrapper}>
      <PreviewHeader
        page={page}
        historyId={historyId}
        currentMobile={currentMobile}
        onSizeChange={handleSizeChanged}
        platform={platform}
        onPlatformChange={onPlatformChange}
        isMobile={true}
      />
      <div className={styles.h5PreviewContainer}>
        <div className={styles.h5PreviewContent}>
          <iframe
            id="mtbird-page-render"
            frameBorder="no"
            src={`/render`}
            width={PreviewMobileType[currentMobile].width}
            height={PreviewMobileType[currentMobile].height}
          />
        </div>
      </div>
    </div>
  );
};

export default H5Preview;
