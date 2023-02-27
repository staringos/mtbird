import { IComponentInstanceForm, IModel } from "@mtbird/shared";

export const convertToRules = (node: IComponentInstanceForm) => {
  const { formConfig } = node;
  const rules = [];
  if (formConfig?.rulesVerifyInside) return [];
  if (formConfig?.isRequired) {
    rules.push({
      required: true,
      message: formConfig?.label + "不能为空!",
    });
  }

  return rules;
};

export const convertColumnsToEntity = (
  columns: any[],
  additionColumns: any[] = []
) => {
  if (!columns) return [];
  return columns
    .filter((cur) => {
      return !additionColumns.find(
        (addition: any) => addition.dataIndex === cur.dataIndex
      );
    })
    .map((cur) => {
      return {
        ...cur,
        ...cur.field,
        title: cur.title,
        keyPath: cur.dataIndex,
      };
    });
};
