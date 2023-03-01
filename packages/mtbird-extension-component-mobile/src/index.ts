import { IExtensionContext } from "@mtbird/shared";
import Example from "./features/Example";

const activity = (context: IExtensionContext) => {
  context.registerFeature("example.tab", Example);
};

export default activity;
