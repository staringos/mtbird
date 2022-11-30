import React from 'react';
import type { IComponentInstanceForm, IDataSource } from '@mtbird/shared';
import Renderer from '@mtbird/renderer-web';
import styles from './style.module.less';

interface IProps {
  schemaConfig: IComponentInstanceForm;
  data: Record<string, any>;
  dataSource: IDataSource;
  variables: Record<string, any>;
  onChange: (keyPath: string, value: any) => void;
  onUpload: (files: any) => Promise<string[]>;
}

const SchemaEditorRender = ({ schemaConfig, data, dataSource, variables, onChange, onUpload }: IProps) => {
  return (
    <div className={styles.schemaEditorContainer}>
      <Renderer
        isEdit={false}
        pageConfig={{ data: schemaConfig }}
        data={data}
        onChange={onChange}
        dataSource={dataSource}
        onUpload={onUpload}
        variables={variables}
      />
    </div>
  );
};

export default SchemaEditorRender;
