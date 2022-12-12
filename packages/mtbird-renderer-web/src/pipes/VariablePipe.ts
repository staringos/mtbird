import get from 'lodash/get';
import { injectVariables } from '@mtbird/core';
import { IPipeProps } from '@mtbird/shared';
import isString from 'lodash/isString';

const ENABLE_VARIABLE_KEYPATH = ['props', 'pattern', 'data'];

/**
 * Get value from ENABLE_VARIABLE_KEYPATH list in node
 * Loop all attributes, find value type of string, and if it content ${{ val.keyPath }}
 * Set content keyPath from variables
 * @param props
 * @returns
 */
const VariablePipe = (props: IPipeProps) => {
  const { node, dataSource, variables } = props;

  ENABLE_VARIABLE_KEYPATH.map((keyPath) => {
    const value = get(node, keyPath);
    if (!value) return;
    injectVariables(variables)(value);
  });

  // children process
  if (isString(node.children)) {
    const children = node.children as string;

    if (children.startsWith('${{') && children.indexOf('}}') === children.length - 2) {
      node.children = get(variables, children.replace('${{', '').replace('}}', ''));
    }
  }

  return { ...props, node, dataSource };
};

export default VariablePipe;
