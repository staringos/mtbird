import React from 'react';
import { IComponentInstance, IDataSource } from '@mtbird/shared';

const context = {};

interface IRenderContext {
  variables: Record<string, any>;
  platform: 'pc' | 'mobile';
  isEdit?: boolean;
  dataSource: IDataSource;
  layoutMoveable?: { grid: any };
  renderExtra?: (node: IComponentInstance) => React.Component | React.FC | string | null;
  onClick: (node: IComponentInstance, e?: React.MouseEvent<HTMLElement>) => void;
  onUpload: (files: any) => Promise<string[]>;
  // change page's component tree data
  onChangeSelf: (keyPath: string, value: any) => void;
  changeVariables: (keyPath: string, value: any) => void;
  Components: React.Component | React.FC;
}

const RenderContext = React.createContext<IRenderContext>(context as any);
export default RenderContext;
