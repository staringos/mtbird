import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as COMPONENT from "@mtbird/component-basic";
import Renderer from "../components/Renderer";
import cloneDeep from "lodash/cloneDeep";
import isArray from "lodash/isArray";

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Renderer> = (args) => (
  <Renderer {...args} />
);

const SBComponentGenerator = (key: string, isContainer: boolean = false) => {
  const { instance } = cloneDeep((COMPONENT as any)[key].manifest as any);

  let node = instance;

  if (node.type !== "container" && !isArray(node.children)) {
    node = cloneDeep(COMPONENT.Container.manifest.instance as any);
    node.children = [instance];
  }

  const pageConfig = {
    name: "测试组件",
    data: node,
  };

  const Primary = Template.bind({});
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  Primary.args = {
    pageConfig,
  } as any;

  // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
  const main = {
    title: `Apis/组件/${key}`,
    component: Renderer,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
      pageConfig,
    },
  } as ComponentMeta<typeof Renderer>;

  return {
    Primary,
    main,
  };
};

export default SBComponentGenerator;
