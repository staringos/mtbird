import React, { useEffect, useState } from "react";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import { Upload } from "antd";
import style from "./style.module.less";

interface IProps {
  value: string;
  maxCount: number;
  onChange: (url: string) => void;
  onUpload: (fileUrls: string[]) => Promise<any>;
}

const UploadComponent = ({ value, maxCount, onChange, onUpload }: IProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value) return;
    setFileList([
      {
        uid: "-1",
        name: value
          ? value.substring(value.lastIndexOf("/") - 1, value.length)
          : "",
        status: "done",
        url: value,
      },
    ]);
  }, [value]);

  const handleChange: UploadProps["onChange"] = async ({
    file,
    fileList: newFileList,
  }: any) => {
    if (!newFileList || newFileList.length <= 0) {
      setFileList([]);
      return onChange("");
    }

    if (!onUpload) return;

    const urls = await onUpload(newFileList);
    const fileList: Array<any> = urls.map((url: string) => ({
      uid: "-1",
      name: url ? url.substring(url.lastIndexOf("/") - 1, url.length) : "",
      status: "done",
      url,
    }));

    setFileList(fileList);
    onChange(maxCount === 1 ? urls[0] : urls);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadButton = (
    <div className={style.uploadButton}>
      {loading ? (
        <i className="mtbird mtbird-loading" />
      ) : (
        <i className="mtbird-icon mtbird-plus" />
      )}
      <div>上传</div>
    </div>
  );

  return (
    // <ImgCrop rotate aspect={node.props.width / node.props.height}></ImgCrop>
    <Upload
      className={style.uploadComponent}
      listType="picture-card"
      fileList={fileList}
      onChange={handleChange}
      onPreview={onPreview}
    >
      {fileList.length < (maxCount as number) && uploadButton}
    </Upload>
  );
};

export default UploadComponent;
