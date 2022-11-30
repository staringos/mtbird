import { IComponentProps } from '@mtbird/shared';
import React from 'react';
import styles from './style.module.less';
import manifest from './manifest';

const SplitLine = ({ node, style, className }: IComponentProps) => {
  return <div {...node.props} style={style} className={styles.mtSplitLine + ' ' + className}></div>;
};

SplitLine.manifest = manifest;

export default SplitLine;
