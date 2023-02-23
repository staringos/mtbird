import React, { useEffect, useState } from 'react';
import styles from './style.module.less';
import type { IPageConfig, IDataSource } from '@mtbird/shared';
import * as BasicComponents from '@mtbird/component-basic';
import { getZoom, ExtensionComponentLoader, RenderContext } from '@mtbird/core';
import { PLATFORM_DEFAULT_WIDTH } from '../constants';
import isEqual from 'lodash/isEqual';
import Render from './Render';
import cloneDeep from 'lodash/cloneDeep';
import { IComponentInstance } from '../../../mtbird-shared/src/types/Component';
import useRenderContext from 'src/context/useRenderContext';

interface IProps {
  dataSource?: IDataSource;
  pageConfig: IPageConfig;
  platform?: 'pc' | 'mobile';
  isEdit?: boolean;
  isZoom?: boolean;
  formId?: string | undefined;
  variables?: Record<string, any>;
  layoutMoveable?: { grid: any };
  renderExtra?: (node: IComponentInstance) => React.Component | React.FC | string | null;
  onClick?: () => void;
  onChangeSelf?: (keyPath: string, value: string) => void;
  onUpload?: (files: any) => Promise<string[]>;
}

export default (props: IProps) => {
  const { pageConfig, platform, onClick, dataSource, onUpload, isZoom, isEdit, layoutMoveable, renderExtra, variables, onChangeSelf } = props;
  const style = pageConfig?.data?.props?.style || {};
  const [isLoading, setIsLoading] = useState(true);
  const [extensionComponents, setExtensionComponents] = useState({});

  const load = async () => {
    setIsLoading(true);

    // load extension components async ly
    const res = await ExtensionComponentLoader.load(pageConfig);
    if (!isEqual(res, extensionComponents)) {
      // 只做增量，不删存量，增量无影响
      setExtensionComponents({ ...res, ...extensionComponents });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, [pageConfig]);

  if (!pageConfig.data || !pageConfig.data.componentName) return <div>Loading...</div>;
  const Components = { ...BasicComponents, ...extensionComponents };

  const context = useRenderContext({
    pageConfig,
    variables,
    renderExtra,
    onClick,
    onUpload,
    dataSource,
    isEdit,
    layoutMoveable,
    Components,
    platform,
    onChangeSelf,
    Render
  });

  return (
    <RenderContext.Provider value={context}>
      <div className={styles.rendererContainer} style={{ zoom: isZoom && platform !== 'pc' ? getZoom(PLATFORM_DEFAULT_WIDTH[platform || '']) : 0 }}>
        <Render node={cloneDeep(pageConfig.data)} style={style} zIndex={1} variables={context.variables as Record<string, any>} />
      </div>
    </RenderContext.Provider>
  );
};
