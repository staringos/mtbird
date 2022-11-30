import { generateFunction } from '@mtbird/core';
import { IPipeProps } from '@mtbird/shared';

const FormConfigPipe = (props: IPipeProps) => {
  const { node, dataSource, formId } = props;

  const { formConfig } = node;
  if (!formConfig || !dataSource?.getValue) return props;

  // use node.formConfig.keyPath or node.id as the key of form
  let realValue = dataSource.getValue((formId || '0') + '.' + (formConfig.keyPath || node.id));

  if (formConfig?.editFormatter) {
    realValue = generateFunction(formConfig?.editFormatter)(realValue);
  }
  node.props.value = realValue;
  return { ...props, node, dataSource };
};

export default FormConfigPipe;
