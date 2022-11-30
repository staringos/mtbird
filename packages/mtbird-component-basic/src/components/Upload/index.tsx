import React, { useEffect, useState } from 'react';
import manifest from './manifest';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { Upload } from 'antd';
import { pureStyle } from '@mtbird/core';
import { IComponentProps } from '@mtbird/shared';
import FormItemWrapper from 'src/toolComponents/FormItemWrapper';
import style from './style.module.less';

const UploadComponent = (allProps: IComponentProps) => {
  const { node, value, onUpload, onChangeValue } = allProps;
  const { formConfig, props } = node;
  const { maxCount } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value) return;
    setFileList([
      {
        uid: '-1',
        name: value ? value.substring(value.lastIndexOf('/') - 1, value.length) : '',
        status: 'done',
        url: value
      }
    ]);
  }, [value]);

  const handleChange: UploadProps['onChange'] = async ({ file, fileList: newFileList }: any) => {
    if (!newFileList || newFileList.length <= 0) {
      setFileList([]);
      return onChangeValue('');
    }

    if (!onUpload) return;

    const urls = await onUpload(newFileList);
    const fileList: Array<any> = urls.map((url: string) => ({
      uid: '-1',
      name: url ? url.substring(url.lastIndexOf('/') - 1, url.length) : '',
      status: 'done',
      url
    }));

    setFileList(fileList);
    onChangeValue(maxCount === 1 ? urls[0] : urls);
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
    <div className={style.uploadButton} style={pureStyle(formConfig?.componentProps?.style)}>
      {loading ? <i className="mtbird mtbird-loading" /> : <i className="mtbird-icon mtbird-plus" />}
      <div>上传</div>
    </div>
  );

  const component = (
    // <ImgCrop rotate aspect={node.props.width / node.props.height}></ImgCrop>
    <Upload className={style.uploadComponent} listType="picture-card" fileList={fileList} onChange={handleChange} onPreview={onPreview}>
      {fileList.length < (maxCount as number) && uploadButton}
      {/* {fileList.length < (maxCount as number) ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
    </Upload>
  );

  return <FormItemWrapper {...allProps} component={component}></FormItemWrapper>;
};

UploadComponent.manifest = manifest;

export default UploadComponent;
