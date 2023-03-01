import { IExtensionContext } from "@mtbird/shared";
import AnimationPanel from "./features/AnimationPanel";

const activity = (context: IExtensionContext) => {
  context.registerFeature("animation.tab", AnimationPanel);
};

export default activity;
