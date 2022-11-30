import { IComponentProps } from '@mtbird/shared/src/types/Component';
import React from 'react';
import styles from './style.module.less';
import manifest from './manifest';
import { Form, message } from 'antd';

const FormComponent = ({ children, node, style, dataSource, isEdit }: IComponentProps) => {
  const [form] = Form.useForm();
  const { formConfig } = node;

  const handleSubmit = async () => {
    if (isEdit) return message.warning('正在编辑中，请预览或发布时提交表单！');
    const isValid = await form.validateFields();
    if (isValid) {
      dataSource.submit && dataSource.submit(node.id);
    }
  };

  if (node.layout === 'flex') {
    style.display = 'flex';
    if (!style.flexDirection) style.flexDirection = 'column';
  }

  return (
    <Form
      style={style}
      layout={formConfig?.formLayout || 'horizontal'}
      initialValues={{ layout: formConfig?.formLayout || 'horizontal' }}
      className={styles.formContainer}
      onFinish={handleSubmit}
      form={form}
    >
      {children}
    </Form>
  );
};

FormComponent.manifest = manifest;

export default FormComponent;
