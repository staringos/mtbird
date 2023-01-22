'use client';
import React, { useEffect, useState } from 'react';
import Editor from '@mtbird/editor';
import { Spin } from 'antd';
import '@mtbird/editor/dist/index.css';
import pageData from '../../data/pageData.json';

const EditorComponent = () => {
  const [isSSR, setIsSSR] = useState(true);
  const args = {
    options: {
      pageConfig: {
        name: '测试H5',
        data: pageData
      },
      extensions: ['mtbird-extension-enterprise', 'mtbird-extension-animation']
    }
  };

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return <Spin />;

  return <Editor {...args} />;
};

export default EditorComponent;
