import {
  IComponentInstance,
  IComponentInstanceForm,
  IPosition,
  IEntity,
} from "@mtbird/shared";
import { mergeKeypath, COMPONENT } from "@mtbird/core";
import { ShapePoolItem } from "./shapes";

export * from "./shapes";

const {
  COMPONENT_DEFAULT_STYLE,
  DEFAULT_OPTIONS,
  SCHEMA_FORM_ITEM_COMPONENT_STYLE,
  SCHEMA_FORM_ITEM_LABEL_STYLE,
  DEFAULT_ENTITIES,
} = COMPONENT;

export const getComponentFormInstance = (
  componentName: string,
  keyPath: string,
  props: Record<string, any>
) => {
  return {
    type: "form",
    componentName,
    formConfig: {
      keyPath,
    },
    props: {
      ...props,
      style: {
        position: "relative",
      },
    },
    children: [],
  };
};

export const generateFormItem = (
  label: string,
  keyPath: string | null,
  children: IComponentInstance[]
): IComponentInstanceForm => {
  return {
    type: "form",
    componentName: "FormItem",
    formConfig: {
      label,
      keyPath,
      labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
    },
    props: {
      style: {
        position: "relative",
        height: 35,
      },
    },
    children,
  };
};

export const generateInputComponent = (
  keyPath: string,
  label?: string,
  data?: any
) => {
  let res = {
    type: "form",
    componentName: "Input",
    formConfig: {
      label,
      keyPath,
      labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
      componentProps: {
        type: "text",
        style: SCHEMA_FORM_ITEM_COMPONENT_STYLE,
      },
    },
    props: {
      style: {
        width: "100%",
      },
    },
    children: [],
  };
  if (data) res = mergeKeypath(res, data);
  return res;
};

export const generateSelectComponent = (
  keyPath: string,
  options: Record<string, any>,
  data?: any
) => {
  let res = {
    type: "form",
    componentName: "Select",
    formConfig: {
      keyPath,
      componentProps: {
        style: SCHEMA_FORM_ITEM_COMPONENT_STYLE,
      },
    },
    data: {
      options,
    },
    props: {
      style: {},
    },
    children: [],
  };
  if (data) res = mergeKeypath(res, data);
  return res;
};

export const generateButtonGroup = (options: any) => {
  return {
    type: "form",
    componentName: "ButtonGroup",
    data: {
      options,
    },
    props: {
      style: {},
    },
    formConfig: {
      componentProps: {
        style: SCHEMA_FORM_ITEM_COMPONENT_STYLE,
      },
    },
    children: [],
  };
};

export const generateSplitLine = (size: number = 1) => {
  return {
    type: "form",
    componentName: "SplitLine",
    props: {
      style: {
        ...SCHEMA_FORM_ITEM_COMPONENT_STYLE,
        height: size,
        backgroundColor: "var(--gray-8)",
      },
    },
    children: [],
  };
};

export const generateSchemaTitle = (title: string) => {
  return {
    type: "form",
    componentName: "Text",
    props: {
      style: {
        color: "white",
        fontWeight: "700",
        height: 30,
        paddingTop: 5,
      },
    },
    children: title,
  };
};

export const generateColorPicker = (keyPath: string, label: string) => {
  return {
    type: "component",
    componentName: "FormItem",
    formConfig: {
      keyPath,
      label,
      componentName: "ColorPicker",
      componentProps: {
        style: SCHEMA_FORM_ITEM_COMPONENT_STYLE,
        // formConfig: {
        //   innerStyle: SCHEMA_FORM_ITEM_COMPONENT_STYLE
        // }
      },
      labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
    },
    props: {
      style: {
        position: "relative",
      },
    },
    children: [],
  };
};

export const generateFormItemSelect = (
  keyPath: string,
  label: string,
  options: Array<{ value: string; label: string }>,
  data?: Record<string, any>
) => {
  let res = {
    type: "component",
    componentName: "FormItem",
    formConfig: {
      keyPath,
      label,
      componentName: "Select",
      componentProps: {
        type: "number",
        style: SCHEMA_FORM_ITEM_COMPONENT_STYLE,
      },
      labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
      suffix: "px",
    },
    data: {
      options,
    },
    props: {
      style: {},
    },
    children: [],
  };

  if (data) res = mergeKeypath(res, data);
  return res;
};

export const generateRadio = (
  label: string,
  keyPath: string,
  options: any,
  data?: any
) => {
  let res = {
    type: "form",
    componentName: "Radio",
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        color: "white",
      },
    },
    formConfig: {
      label,
      keyPath,
      labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
    },
    data: {
      options,
    },
    children: [],
  };
  if (data) res = mergeKeypath(res, data);
  return res;
};

export const generateUpload = (label: string, keyPath: string, data?: any) => {
  let schema = {
    type: "form",
    componentName: "Upload",
    props: {
      maxCount: 1,
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        width: 200,
        borderWidth: 0,
      },
    },
    formConfig: {
      label,
      keyPath,
      labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
      componentProps: {
        style: SCHEMA_FORM_ITEM_COMPONENT_STYLE,
      },
    },
    data: {
      options: DEFAULT_OPTIONS,
    },
    children: [],
  };
  if (schema) schema = mergeKeypath(schema, data);
  return schema;
};

export const generateTextArea = (
  label: string,
  keyPath: string,
  data?: any
) => {
  let schema = {
    type: "form",
    componentName: "TextArea",
    props: {
      maxCount: 1,
      style: {
        ...COMPONENT_DEFAULT_STYLE,
      },
    },
    formConfig: {
      label,
      keyPath,
      labelStyle: SCHEMA_FORM_ITEM_LABEL_STYLE,
      componentProps: {
        style: {
          ...SCHEMA_FORM_ITEM_COMPONENT_STYLE,
          height: 100,
        },
      },
    },
    data: {
      options: DEFAULT_OPTIONS,
    },
    children: [],
  };
  if (schema) schema = mergeKeypath(schema, data);
  return schema;
};

export const generateShape = (shape: ShapePoolItem, size = 28) => {
  return {
    type: "component",
    componentName: "Shape",
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        height: size,
        width: size,
        backgroundColor: "var(--gray-3)",
      },
    },
    data: {
      viewBox: shape.viewBox,
      path: shape.path,
      pathFormula: shape.pathFormula,
    },
    children: [],
  };
};

export const generateContainer = (
  children: Array<IComponentInstance>,
  pos: IPosition
) => {
  return {
    type: "container",
    componentName: "Container",
    layout: "absolute",
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
        ...pos,
      },
    },
    children,
  };
};

export const generateList = (
  label: string = "列表",
  keyPath: string = "data.options",
  entity: IEntity[] = DEFAULT_ENTITIES
) => {
  return [
    generateSplitLine(),
    generateSchemaTitle(label),
    {
      type: "form",
      componentName: "List",
      props: {
        style: {
          ...COMPONENT_DEFAULT_STYLE,
        },
      },
      formConfig: {
        keyPath,
      },
      data: {
        entity,
      },
      children: [],
    },
  ];
};
