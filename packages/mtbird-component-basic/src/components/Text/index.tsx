import { IComponentProps } from '@mtbird/shared/src/types/Component';
import React, { useState } from 'react';
import styles from './style.module.less';
import manifest from './manifest';
import isArray from 'lodash/isArray';

const Text = ({ children, node, style, isEdit, onChangeValue }: IComponentProps) => {
  const [editable, setEditable] = useState(false);

  // TODO edit in component
  const handleDBClick = () => {
    setEditable(true);
  };

  const handleClick = () => {};

  const handleBlur = () => {
    setEditable(false);
  };

  const handleChange = (e: any) => {
    onChangeValue(e.target.value, 'children');
  };

  return (
    <div
      {...node.props}
      style={style}
      className={styles.mtText + (editable ? ' mtTextEditing' : '')}
      onClick={handleClick}
      onDoubleClick={handleDBClick}
      onInput={handleChange}
      contentEditable={editable}
      dangerouslySetInnerHTML={{ __html: isArray(children) ? children.join('') : children }}
      onBlur={handleBlur}
    ></div>
  );
};

Text.manifest = manifest;

export default Text;
