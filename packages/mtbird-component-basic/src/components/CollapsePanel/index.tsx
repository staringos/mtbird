import React, { useState } from 'react';
import { IComponentProps } from '@mtbird/shared/dist/types';
import manifest from './manifest';
import styles from './style.module.less';
import get from 'lodash/get';

const CollapsePanelComponent = ({ children, node, style }: IComponentProps) => {
  const [open, setOpen] = useState(!!get(node, 'data.open'));

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div style={style} className={styles.collapsePanel} id={node.id}>
      <div className={styles.panelHeader} onClick={handleToggleOpen} style={{ fontSize: style.fontSize, color: style.color }}>
        {open ? <i className="mtbird-icon mtbird-up" /> : <i className="mtbird-icon mtbird-down" />} {node.data?.title || '标题'}
      </div>
      <div className={styles.panelContent + ' ' + (open ? styles.show : '')}>{children}</div>
    </div>
  );
};

CollapsePanelComponent.manifest = manifest;

export default CollapsePanelComponent;
