import React from 'react';
import Input from '../Input';
import { IComponentProps } from '@mtbird/shared';
import manifest from './manifest';

const InputPhone = (allProps: IComponentProps) => {
  return <Input {...allProps} />;
};

InputPhone.manifest = manifest;

export default InputPhone;
