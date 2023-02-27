import { ComponentStory, ComponentMeta } from "@storybook/react";
import Editor from "@mtbird/editor";
import "@mtbird/editor/dist/index.css";

import formData from "../../../data/formData.json";
import pageData from "../../../data/pageData.json";

const options = {
  pageConfig: {
    name: "测试表单",
    data: formData,
  },
};

export default {
  title: "Demos/编辑器",
  component: Editor,
  parameters: {
    options,
    viewMode: "story",
  },
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = (args) => (
  <div
    style={{
      width: 1000,
      height: 600,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Editor {...args} />
  </div>
);

export const 表单 = Template.bind({});

表单.args = {
  options,
};

export const H5页面 = Template.bind({});
H5页面.args = {
  options: {
    pageConfig: {
      title: "测试H5",
      data: pageData,
    },
  },
};

export const 企业级拓展 = Template.bind({});
企业级拓展.args = {
  options: {
    pageConfig: {
      title: "测试H5",
      data: pageData,
    },
    extensions: ["mtbird-extension-enterprise"],
  },
};

export const 动画拓展 = Template.bind({});
动画拓展.args = {
  options: {
    pageConfig: {
      title: "测试H5",
      data: pageData,
    },
    extensions: ["mtbird-extension-animation"],
  },
};

export const 屏幕跟随拓展 = Template.bind({});
屏幕跟随拓展.args = {
  options: {
    pageConfig: {
      title: "测试H5",
      data: pageData,
    },
    extensions: ["mtbird-extension-animation"],
  },
};
