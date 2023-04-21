import { IComponentProps } from "@mtbird/shared/src/types/Component";
import React, { useMemo } from "react";
import styles from "./style.module.less";
import manifest from "./manifest";
import { Form, message } from "antd";

const getFormSubmitFlag = (id: string) => `FORM_COMPLETE_SUBMIT_WITH_${id}`;

const FormComponent = ({
  children,
  node,
  style,
  dataSource,
  isEdit,
}: IComponentProps) => {
  const [form] = Form.useForm();
  const { formConfig } = node;

  const handleSubmit = async () => {
    if (isEdit) return message.warning("正在编辑中，请预览或发布时提交表单！");
    const isValid = await form.validateFields();

    if (isValid && dataSource?.submit) {
      dataSource.submit(node.id!);

      localStorage.setItem(getFormSubmitFlag(node.id!), node.id!);
    }
  };

  if (node.layout === "flex") {
    style.display = "flex";
    if (!style.flexDirection) style.flexDirection = "column";
  }

  const isSubmitted = useMemo(() => {
    if (isEdit) {
      return false;
    }

    return !formConfig?.duplicateSubmit && localStorage.getItem(getFormSubmitFlag(node.id!)) === String(node.id)
  }, [formConfig.duplicateSubmit, node.id, isEdit])

  return (
    <Form
      style={style}
      layout={formConfig?.formLayout || "horizontal"}
      initialValues={{ layout: formConfig?.formLayout || "horizontal" }}
      className={styles.formContainer}
      onFinish={handleSubmit}
      form={form}
    >
      {isSubmitted ? <div dangerouslySetInnerHTML={{ __html: formConfig?.duplicateSubmitText || "已提交" }}></div> : children}
    </Form>
  );
};

FormComponent.manifest = manifest;

export default FormComponent;
