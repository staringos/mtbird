import { IComponentProps } from '@mtbird/shared/src/types/Component';
import React, { useState } from 'react';
import styles from './style.module.less';
import manifest from './manifest';
import isArray from 'lodash/isArray';

const Text = ({ children, node, style, isEdit, onChangeSelf }: IComponentProps) => {
  const [editable, setEditable] = useState(false);

  // TODO edit in component
  const handleDBClick = () => {
    setEditable(true);
  };

  const handleBlur = (e: any) => {
    onChangeSelf && onChangeSelf('children', e.currentTarget.textContent);
    setEditable(false);
  };

  return (
    <div
      {...node.props}
      style={style}
      className={styles.mtText + (editable ? ' mtTextEditing' : '')}
      onDoubleClick={handleDBClick}
      contentEditable={editable}
      dangerouslySetInnerHTML={{ __html: isArray(children) ? children.join('') : children }}
      onBlur={handleBlur}
    ></div>
  );
};

Text.manifest = manifest;

export default Text;
