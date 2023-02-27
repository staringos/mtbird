import { IEvent } from "@mtbird/shared/dist/types";
import { mergeKeypath } from "../utils";

export default {
  button: (children?: string, click?: IEvent, style?: any) => {
    return {
      type: "component",
      componentName: "Button",
      props: {
        style,
        type: "primary",
        shape: "default",
      },
      events: {
        click: click || {
          type: "link",
          src: "http://staringos.com",
        },
      },
      editing: {
        showMask: true,
        maskText: "双击操作",
      },
      children: children || "按钮",
    };
  },

  text: (
    children: string,
    style?: Record<string, any>,
    className?: string,
    data?: Record<string, any>
  ) => {
    let res = {
      type: "component",
      componentName: "Text",
      props: {
        className,
        style: {
          width: "unset",
          height: "unset",
          ...style,
        },
      },
      children: children || "<p>这是一段文本呀呀呀</p>",
    } as any;

    if (data) res = mergeKeypath(res, data);
    return res;
  },

  image: (
    src: string,
    style: Record<string, any>,
    data: Record<string, any>
  ) => {
    let res = {
      type: "component",
      componentName: "Image",
      props: {
        src,
        style: {
          height: "unset",
          width: "unset",
          ...style,
        },
      },
      children: [],
    } as any;
    if (data) res = mergeKeypath(res, data);
    return res;
  },

  icon: (
    className: string,
    style: Record<string, any>,
    data: Record<string, any>
  ) => {
    let res = {
      type: "component",
      componentName: "Icon",
      props: {
        style: {},
        className,
      },
      children: [],
    } as any;
    if (data) res = mergeKeypath(res, data);
    return res;
  },
};
