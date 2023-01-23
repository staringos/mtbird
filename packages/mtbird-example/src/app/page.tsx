'use client';
import React from 'react';
import EditorComponent from '@/components/Editor';
import styles from './page.module.css';

const EditorPage = () => {
  return (
    <div className={styles.editorPage}>
      <EditorComponent />
    </div>
  );
};

export default EditorPage;
