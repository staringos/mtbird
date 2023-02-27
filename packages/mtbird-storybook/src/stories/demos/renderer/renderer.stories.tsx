import { ComponentStory, ComponentMeta } from "@storybook/react";
import Renderer from "@mtbird/renderer-web";
import "@mtbird/editor/dist/index.css";

import formData from "../../../data/formData.json";
import pageData from "../../../data/pageData.json";
import InnerDataSource from "../../../utils/InnerDataSource";

export default {
  title: "Demos/渲染器",
  component: Renderer,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "iphone6",
      viewMode: "story",
    },
  },
} as ComponentMeta<typeof Renderer>;

const Template: ComponentStory<typeof Renderer> = (args) => (
  <Renderer {...args} />
  // <div style={{ width: 365, height: 750, display: 'flex', flexDirection: 'column' }}>

  // </div>
);

export const FormPage = Template.bind({});

FormPage.args = {
  pageConfig: {
    name: "测试表单",
    data: formData,
  } as any,
  dataSource: new InnerDataSource(),
};

export const H5Page = Template.bind({});
H5Page.args = {
  pageConfig: {
    name: "测试H5页面",
    data: pageData,
  } as any,
  dataSource: new InnerDataSource(),
};
