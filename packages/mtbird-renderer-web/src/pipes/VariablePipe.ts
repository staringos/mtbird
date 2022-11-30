import get from 'lodash/get';
import { injectVariables } from '@mtbird/core';
import { IPipeProps } from '@mtbird/shared';

const ENABLE_VARIABLE_KEYPATH = ['props.style', 'pattern', 'children'];

/**
 * Get value from ENABLE_VARIABLE_KEYPATH list in node
 * Loop all attributes, find value type of string, and if it content ${{ val.keyPath }}
 * Set content keyPath from variables
 * @param props
 * @returns
 */
const VariablePipe = (props: IPipeProps) => {
  const { node, dataSource, variables } = props;
  // if (!node.data || !node.data.variables) return { ...props, node, dataSource };

  ENABLE_VARIABLE_KEYPATH.map((keyPath) => {
    const value = get(node, keyPath);
    if (!value) return;
    injectVariables(variables)(value);
  });

  return { ...props, node, dataSource };
};

export default VariablePipe;
