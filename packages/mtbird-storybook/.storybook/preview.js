import "antd/dist/reset.css";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export const parameters = {
  options: {
    storySort: {
      order: [
        "Home",
        "拓展",
        [
          "介绍",
          "快速开始",
          "文件结构",
          "Contribute(编辑器贡献)",
          "Pipe(渲染管线)",
          "Component(自定义组件)",
        ],
        "编辑器",
        ["介绍", "页面", "绑定域名", "表单", "弹窗", "嵌入项目"],
        "渲染器",
        ["介绍", "嵌入渲染器"],
        "数据中心",
        ["介绍"],
        "Demos",
        "Apis",
        "一站式营销",
        "服务",
      ],
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
    },
  },
};
