import type {
  IComponentManifest,
  IComponentInstanceForm,
} from "@mtbird/shared";
import { COMPONENT, SchemaGenerator } from "@mtbird/core";

const {
  COMPONENT_DEFAULT_STYLE,
  SCHEMA_COMPONENT_BASIC_STYLE,
  SCHEMA_FORM_CONFIG,
} = COMPONENT;

const manifest: IComponentManifest<IComponentInstanceForm> = {
  type: "form",
  componentName: "Table",
  title: "表格",
  icon: "mtbird-table",
  desc: "",
  category: "form",
  schema: [
    ...SCHEMA_COMPONENT_BASIC_STYLE,
    ...SCHEMA_FORM_CONFIG,
    ...SchemaGenerator.list("选项", "data.options", [
      {
        title: "列名",
        keyPath: "title",
        type: "string",
        default: "",
        isRequired: true,
      },
      {
        title: "类型",
        keyPath: "type",
        type: "ENUM",
        default: "",
        isRequired: true,
        options: [
          {
            value: "text",
            label: "文字",
          },
          {
            value: "number",
            label: "数字",
          },
        ],
      },
      {
        title: "必填",
        keyPath: "required",
        type: "ENUM",
        default: "",
        isRequired: true,
        options: [
          {
            value: "true",
            label: "必填",
          },
          {
            value: "false",
            label: "选填",
          },
        ],
      },
    ]),
  ],
  instance: {
    type: "form",
    componentName: "Table",
    props: {
      style: {
        ...COMPONENT_DEFAULT_STYLE,
      },
    },
    data: {
      options: [
        {
          title: "名字",
          type: "text",
          required: "true",
        },
        {
          title: "年龄",
          type: "number",
          required: "true",
        },
        {
          title: "住址",
          type: "text",
          required: "false",
        },
      ],
    },
    formConfig: {
      label: "表格",
    },
    children: [],
  },
};

export default manifest;
