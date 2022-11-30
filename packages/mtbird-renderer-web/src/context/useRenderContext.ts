import { useState } from 'react';
import set from 'lodash/set';
import { initVariables } from '../../../mtbird-core/src/utils';

const useRenderContext = (context: any) => {
  const initVars = initVariables(context.pageConfig.data);
  const [variables, setVariables] = useState({ ...initVars, ...context.variables });

  const changeVariable = (keyPath: string, value: string) => {
    set(variables, keyPath, value);
    setVariables({ ...variables });
  };

  return {
    ...context,
    variables,
    changeVariable
  };
};

export default useRenderContext;
