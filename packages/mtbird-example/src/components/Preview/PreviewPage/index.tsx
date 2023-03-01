"next/router";
import React, { useState } from "react";
import { IPageHistory } from "@/types/Page";
import styles from "./style.module.css";
import H5Preview from "../H5Preview";
import PCPreview from "../PCPreview";
import { DATA } from "@/utils/constants";

const PreviewPage = () => {
  const [history, setHistory] = useState<IPageHistory | null>(null);
  const [platform, setPlatform] = useState<string | undefined>(
    DATA.platform || "mobile"
  );

  const handlePlatformChange = (e: string) => {
    setPlatform(e);
  };

  return (
    <div className={styles.previewContainer}>
      {platform === "mobile" && (
        <H5Preview
          page={DATA as any}
          historyId={history?.id}
          platform={platform}
          onPlatformChange={handlePlatformChange}
        />
      )}
      {platform === "pc" && (
        <PCPreview
          page={DATA as any}
          historyId={history?.id}
          platform={platform}
          onPlatformChange={handlePlatformChange}
        />
      )}
    </div>
  );
};

export default PreviewPage;
