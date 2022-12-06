import React from 'react';
import { Form } from 'antd';
import isArray from 'lodash/isArray';
import styles from './style.module.less';
import { IComponentProps } from '@mtbird/shared/src/types/Component';
import manifest from './manifest';
import { convertToRules } from '../../../utils/component';
import { FormItemType } from '../constants';
import { IComponentInstanceForm } from '@mtbird/shared';
import { getFormKeypath } from '@mtbird/core';

interface IProps extends IComponentProps {
  renderChildrenOnly: boolean;
}

const FormItemComponent = (props: IProps) => {
  const { node, dataSource, children, onChangeValue, renderChildrenOnly } = props;
  const { formConfig } = node as IComponentInstanceForm;
  const FormComponent = FormItemType[formConfig?.componentName];
  const keyPath = getFormKeypath(node);
  const { style } = node.props;
  const isMultiple = isArray(dataSource?.getState()['currentComponent']);
  const value = isMultiple ? dataSource?.getValue('0.' + keyPath) : dataSource?.getValue(keyPath);

  let rules = convertToRules(node as any);

  if (formConfig?.rules) {
    rules = rules.concat(formConfig.rules);
  }

  return (
    <Form.Item
      className={styles.formItem}
      style={{ height: style?.height }}
      colon={false}
      rules={rules}
      label={<label style={{ ...(formConfig?.labelStyle || {}), width: formConfig?.labelStyle?.width || 80 }}>{formConfig?.label || ' '}</label>}
      name={keyPath}
      required={formConfig?.isRequired}
    >
      <div className={styles.formItemContent}>
        {!renderChildrenOnly && formConfig?.keyPath && FormComponent && (
          <FormComponent
            {...props}
            {...formConfig?.componentProps}
            node={node}
            value={value}
            onChangeValue={(value: any) => onChangeValue(value, formConfig?.keyPath)}
            dataSource={dataSource}
            componentOnly={true}
          />
        )}
        {children}
        {formConfig?.suffix && <span style={formConfig?.labelStyle}>&nbsp;&nbsp;{formConfig?.suffix}</span>}
      </div>
    </Form.Item>
  );
};

FormItemComponent.manifest = manifest;

export default FormItemComponent;
