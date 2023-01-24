import React from 'react';
import { IComponentProps } from '@mtbird/shared';
import FormItemComponent from '../components/Form/FormItem';

const withFormItem = (Component: React.ComponentType) => {
  return (allProps: IComponentProps) => {
    if (allProps.componentOnly) return <Component {...allProps} />;
    return (
      <FormItemComponent {...allProps} renderChildrenOnly={true}>
        <Component {...allProps} />
      </FormItemComponent>
    );
  };
};

export default withFormItem;
