import { TextSchemaConfig } from "@mtbird/helper-component";

export default {
  title: "文字组件",
  properties: {
    style: {
      properties: {
        ...TextSchemaConfig,
      },
    },
  },
};
