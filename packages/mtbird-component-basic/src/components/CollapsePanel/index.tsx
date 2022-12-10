import React from 'react';
import { IComponentProps } from '@mtbird/shared/dist/types';
import manifest from './manifest';
import get from 'lodash/get';
import { CollapsePanel } from '@mtbird/ui';

const CollapsePanelComponent = ({ children, node, style }: IComponentProps) => {
  return (
    <CollapsePanel id={node.id} title={node.data?.title} style={style} defaultOpen={!!get(node, 'data.open')}>
      {children}
    </CollapsePanel>
  );
};

CollapsePanelComponent.manifest = manifest;

export default CollapsePanelComponent;
