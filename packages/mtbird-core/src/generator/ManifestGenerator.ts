import { IComponentCommon } from "@mtbird/shared/dist/types";
import { SCHEMA_COMPONENT_BASIC_STYLE } from "../constants/component";

export default {
  light: (title?: string, additionSchema: IComponentCommon[] = []) => {
    return {
      type: "component",
      componentName: "",
      title: title || "轻Slot",
      icon: "",
      desc: "",
      componentLib: "website",
      schema: [...SCHEMA_COMPONENT_BASIC_STYLE, ...additionSchema],
      instance: {},
    };
  },
};
