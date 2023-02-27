import React from "react";
import { IPageConfig } from "@mtbird/shared";
import PreviewHeader from "../PreviewHeader";
import styles from "./style.module.css";

interface IProps {
  page: IPageConfig;
  historyId?: string;
  onPlatformChange: (e: string) => void;
  platform: string;
}

const PCPreview = ({ page, platform, historyId, onPlatformChange }: IProps) => {
  return (
    <div className={styles.pcPreviewWrapper}>
      <PreviewHeader
        page={page}
        historyId={historyId}
        platform={platform}
        onPlatformChange={onPlatformChange}
        isMobile={false}
      />
      <div className={styles.pcPreviewContainer}>
        <iframe
          id="mtbird-page-render"
          className={styles.pcPreviewContent}
          frameBorder="no"
          src={`/preview/render/${page.id}`}
        />
      </div>
    </div>
  );
};

export default PCPreview;
